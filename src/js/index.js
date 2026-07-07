import { nhost } from "./nhost.js"
import { gql } from "graphql-request"
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

   const query = gql`
                mutation MyMutation($title: String, $descriptiion:String, $link: String) {
                    insert_projects(objects: {description: $title, title: $descriptiion, link: $link}) {
                    affected_rows
                }
    }`

    const { data } = await nhost.graphql.request(query, formDataObject)
    if(data.insert_projects.affected_rows == 1)
      displaySuccess()
   else
      displayError()

}

const getWinner = async () => {
   const query = gql`
      query {
         projects(where: {winner: {_eq: true}}) {
            link
            title
            description
          }
      }`

      const { data } = await nhost.graphql.request(query)
      return (data.projects ? data.projects : [])
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
