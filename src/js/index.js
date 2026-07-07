import { nhost } from "./nhost.js"
import { createProjectNode } from "./helper.js"

window.onload = async() => {
   render()
}

const render = async () => {
   const winner = await getWinner()

   if (winner.length != 0)
      displayWinner(winner[0])
   else
      displayForm()
}

const form = document.getElementById("form")
const button = form.querySelector("button")

const formSection = document.querySelector("#form-section")
const winnerSection = document.querySelector("#winner-section")

const submitForm = async (event) => {
   event.preventDefault()

   const formData = new FormData(form)
   const formDataObject = Object.fromEntries(formData.entries())

   button.innerHTML = "Processing..."

   // v4: nhost.graphql.request takes a single object { query, variables }
   // The query string is passed directly (not via gql tag from graphql-request)
   const response = await nhost.graphql.request({
      query: `
         mutation MyMutation($title: String, $description: String, $link: String) {
            insert_projects(objects: {title: $title, description: $description, link: $link}) {
               affected_rows
            }
         }
      `,
      variables: {
         title: formDataObject.title,
         description: formDataObject.description,
         link: formDataObject.link,
      },
   })

   if (response.body && response.body.data && response.body.data.insert_projects.affected_rows == 1)
      displaySuccess()
   else
      displayError()
}

const getWinner = async () => {
   // v4: nhost.graphql.request takes a single object { query, variables? }
   const response = await nhost.graphql.request({
      query: `
         query {
            projects(where: {winner: {_eq: true}}) {
               link
               title
               description
            }
         }
      `,
   })
   const data = response.body && response.body.data
   return (data && data.projects ? data.projects : [])
}

form.addEventListener("submit", submitForm)

const displayForm = () => {
   formSection.classList.remove("hidden")
   winnerSection.remove()
}

const displayWinner = (winner) => {
   winnerSection.classList.remove("hidden")
   const winnerDiv = createProjectNode(winner)
   winnerSection.appendChild(winnerDiv)
   formSection.remove()
}

const displaySuccess = () => {
   button.outerHTML = '<p class="text-green-700">Your project is submitted. Wait for the results 🤞</p>'
   form.reset()
}

const displayError = () => {
   alert("Something went wrong. Please try again later")
   button.innerHTML = "Submit Project"
}
