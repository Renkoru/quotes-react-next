import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  providers: [
    Google,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        identifier: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null
 
        // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password)
 
        // logic to verify if the user exists
        // user = await getUserFromDb(credentials.email, pwHash)
        // `${process.env.STRAPI_BACKEND_URL}/api/auth/local`,
        const strapiResponse = await fetch('http://localhost:1337/api/auth/local', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier: credentials.identifier, password: credentials.password }),
        })

        const data = await strapiResponse.json();
        console.log("credentials", credentials)
        console.log("data", data)

        return {
          name: data.user.username,
          email: data.user.email,
          id: data.user.id.toString(),
          strapiUserId: data.user.id,
          blocked: data.user.blocked,
          strapiToken: data.jwt,
        };

        console.log("user", user)
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }
 
        // return user object with their profile data
        return user
      },
    }),
  ],
  callbacks: {
    // This method is not invoked when you persist sessions in a database.
    async jwt({ token, account }) {
      if (!account) {
        return token;
      }

      const { provider, access_token } = account;
      if (provider === 'google') {
        // we now know we are doing a sign in using GoogleProvider
        // do some strapi stuff here
        const res = await fetch(
          `${process.env.STRAPI_BACKEND_URL}/api/auth/google/callback?access_token=${access_token}`
        );
        const data = await res.json();
        const { jwt, user } = data;
        token.accessToken = jwt;
        token.userId = user.id;
      }

      return token;
    },

    // async session({ session, token, user }) {
    //   // Send properties to the client, like an access_token from a provider.
    //   session.user.accessToken = token.accessToken as string;
    //   session.user.userId = token.userId as number;
    //   return session;
    // },
  },
})
