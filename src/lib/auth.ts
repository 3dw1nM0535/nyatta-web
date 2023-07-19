import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = (): AuthOptions => {
  const providers = [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
  ]
  const callbacks = {
    async session({ session }: any) {
      // call our own API to check if user is onboarded
      // to determine redirect URL
      if (session) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API}/handshake`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: session?.user?.email,
                first_name: session?.user?.name?.split(' ')[0],
                last_name: session?.user?.name?.split(' ')[1],
                avatar: session?.user?.image,
              }),
            }
          )
          const data = await res.json()
          session.onboarding = data.onboarding
          session.token = data.access_token
        } catch (err) {
          console.error(err)
        }
      } else {
        return session
      }
      return session
    },
    
    async redirect({ url, baseUrl }: any) {
      if (url.includes('/login/user')) {
        return baseUrl
      }
      return url
    },
  }
  return { providers, callbacks }
}
