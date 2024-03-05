import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../components/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };