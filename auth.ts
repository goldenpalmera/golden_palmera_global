import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

function getAdminEmail(): string {
  const adminEmail =
    process.env.ADMIN_EMAIL?.toLowerCase();

  if (!adminEmail) {
    throw new Error(
      "ADMIN_EMAIL is not configured."
    );
  }
  return adminEmail;
}

const adminEmail = getAdminEmail();

const googleClientId = process.env.AUTH_GOOGLE_ID!;
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET!;

if (!googleClientId || !googleClientSecret) {
  throw new Error("Google OAuth credentials are not configured.");
}


export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret
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
  },

  trustHost: true,
});
