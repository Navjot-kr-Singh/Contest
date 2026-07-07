import { signIn, signInUrl, isSignedIn } from "./auth.js";

const form = document.getElementById("form")
const button = form.querySelector("button")

window.onload = async () => {
   // v4: isSignedIn() is synchronous — no await needed
   // But we wait for session restoration from localStorage via refreshSession
   await nhost_waitForSession()
   if (isSignedIn())
      window.location.href = signInUrl
}

const submitForm = async (event) => {
   event.preventDefault()

   const formData = new FormData(form)
   const formDataObject = Object.fromEntries(formData.entries())

   button.innerHTML = "Signing in..."
   const session = await signIn(formDataObject)

   if (session !== null) {
      window.location.href = signInUrl
      return
   }

   alert("Incorrect email or password")
   button.innerHTML = 'Sign In'
}

form.addEventListener("submit", submitForm)

// Helper: wait briefly for the client-side session middleware to restore
// the session from localStorage (happens asynchronously on init).
import { nhost } from "./nhost.js"
async function nhost_waitForSession() {
   // Attempt a token refresh — this restores the session from localStorage
   // if a valid refresh token exists. Ignore errors (e.g. no prior session).
   try {
      await nhost.refreshSession(0)
   } catch (_) {
      // No prior session — normal for first visit
   }
}
