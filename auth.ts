import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const adminEmail =
  process.env.ADMIN_EMAIL?.toLowerCase();

if (!adminEmail) {
  throw new Error(
    "ADMIN_EMAIL is not configured."
  );
}

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId:
        process.env.AUTH_GOOGLE_ID!,
      clientSecret:
        process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/admin/login",
  },

  callbacks: {
    async signIn({ user }) {
      const email = user.email?.toLowerCase();

      if (!email) {
        return false;
      }

      return email === adminEmail;
    },

    // async session({ session, token }) {
    //   if (session.user && token.email) {
    //     session.user.email = token.email;
    //   }

    //   return session;
    // },
  },

  trustHost: true,
});
