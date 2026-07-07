import { nhost } from "./nhost.js"

const signInUrl = '/admin/index.html'
const signOutUrl = '/admin/login.html'

const signIn = async ({ email, password }) => {
   const response = await nhost.auth.signInEmailPassword({ email, password })
   // v4: FetchResponse<SignInEmailPasswordResponse> — body.session holds the session
   if (response.body && response.body.session) {
      return response.body.session
   }
   return null
}

const signOut = async () => {
   const session = nhost.getUserSession()
   const refreshToken = session?.refreshToken ?? undefined
   await nhost.auth.signOut({ refreshToken })
   nhost.clearSession()
}

const isSignedIn = () => {
   // v4: getUserSession() returns StoredSession | null — synchronous, no async needed
   const session = nhost.getUserSession()
   return session !== null && session !== undefined
}

export { signIn, signOut, signInUrl, signOutUrl, isSignedIn }
