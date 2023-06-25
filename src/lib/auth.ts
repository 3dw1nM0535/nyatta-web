import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

interface Session {
  user: {
    name: string
    email: string
    image: string
  },
  expires: Date,
  onboarding: string
}

export const authOptions = (): AuthOptions => {
  let userSession: Session
  const providers = [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
  ]
  const callbacks = {
    async session({ session }) {
      // TODO call our own API to check if user is onboarded
      // to determine redirect URL
      if (session) {
        try {
          const res = await fetch(
            `http://localhost:4000/handshake`,
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
          session.onboarding = data.access_token
        } catch (err) {
          console.log(err)
        }
      } else {
        return session
      }
      return session
    },
  }
  return { providers, callbacks }
}
