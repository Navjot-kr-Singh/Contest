import { signIn, signInUrl, isSignedIn } from "./auth.js";

const form = document.getElementById("form")
const button = form.querySelector("button")

window.onload = async () => {
   if(await isSignedIn())
   window.location.href = signInUrl
}

const submitForm = async (event) => {
   event.preventDefault()

   const formData = new FormData(form)
   const formDataObject = Object.fromEntries(formData.entries())

   button.innerHTML = "Signin in..."
   const session = await signIn(formDataObject)

   if(session !== null)
      window.location.href = signInUrl

   alert("Incorrect email or password")
   button.innerHTML = 'Sign In'
}

form.addEventListener("submit", submitForm)
