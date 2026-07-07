import { isSignedIn } from "./auth.js"
import { gql } from "graphql-request"
import { nhost } from "./nhost.js"
import { createProjectNode } from "./helper.js"

window.onload = async() => {
   const check = await isSignedIn()
   if(check)
      await renderPage()
   else
      window.location.href = 'login.html'
}

const renderPage = async () => {
   const query = gql`
    query MyQuery {
    projects(order_by: {id: desc}) {
        id
        description
        link
        title
        winner
    }
    }`

    const { data } = await nhost.graphql.request(query)
    if(data.projects) {
      displayWinner(data.projects)
      displayProjects(data.projects)
    }
}

const updateWinner = async (id) => {
   const query = gql`
   mutation MyMutation($id: Int) {
      update_projects(where: {id: {_eq: $id}}, _set: {winner: true}) {
        affected_rows
      }
    }`

    const { data } = await nhost.graphql.request(query, { "id": id })
    if(data.update_projects.affected_rows === 1)
      location.reload()

}

const displayProjects = (projects) => {

   const winner = getWinner(projects)
   projects.forEach(project => {
      const projectDiv = createProjectNode(project)

      if(winner.length === 0) {
         const button = document.createElement("button");
         button.classList.add("mt-2", "rounded", "bg-indigo-500", "text-white", "px-4", "py-2", "text-sm", "font-bold")
         button.innerHTML = "Select Winner"
         button.addEventListener("click", () => updateWinner(project.id))
         projectDiv.append(button)
      }

      document.getElementById("projects").append(projectDiv)
   });
}

const displayWinner = (projects) => {
   const winner = getWinner(projects)
   if(winner.length !== 0) {
      const winnerDiv = createProjectNode(winner[0])
      document.getElementById("winner").append(winnerDiv)
      document.querySelector("#winner > p").remove()
   }
}

const getWinner = (projects) => {
   return projects.filter((project) => project.winner === true)
}
