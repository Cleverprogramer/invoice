import { db } from "@/db/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import NextAuth from "next-auth";
import Nodemailer from "next-auth/providers/nodemailer";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    verifyRequest: "/auth/verify",
  },
});
