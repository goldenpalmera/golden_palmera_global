import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google,
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/admin/login",
  },

  callbacks: {
    async signIn({ user }) {
      const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
      const email = user.email?.toLowerCase();

      if (!adminEmail || !email) {
        return false;
      }

      return email === adminEmail;
    },
  },

  trustHost: true,
});
