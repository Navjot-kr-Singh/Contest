import { signOut, signOutUrl } from "./auth.js";

const form = document.getElementById("signOutForm")

const submitForm = async (event) => {
   event.preventDefault()
   await signOut()
   window.location.href = signOutUrl
}

form.addEventListener("submit", submitForm)
