import NextAuth, { type AuthOptions } from "next-auth";

import { authOptions } from "lib/auth";

const options: AuthOptions = {
  providers: authOptions().providers,
  callbacks: authOptions().callbacks,
}
const handler = NextAuth(options);

export { handler as GET, handler as POST };
