import { isSignedIn } from "./auth.js"
import { nhost } from "./nhost.js"
import { createProjectNode } from "./helper.js"

window.onload = async() => {
   // v4: Restore session from localStorage before checking auth state
   try {
      await nhost.refreshSession(0)
   } catch (_) {
      // No prior session
   }

   const check = isSignedIn()
   if(check)
      await renderPage()
   else
      window.location.href = 'login.html'
}

const renderPage = async () => {
   // v4: nhost.graphql.request takes a single object { query, variables? }
   const response = await nhost.graphql.request({
      query: `
         query MyQuery {
            projects(order_by: {id: desc}) {
               id
               description
               link
               title
               winner
            }
         }
      `,
   })

   const data = response.body && response.body.data
   if(data && data.projects) {
      displayWinner(data.projects)
      displayProjects(data.projects)
   }
}

const updateWinner = async (id) => {
   // v4: nhost.graphql.request takes a single object { query, variables }
   const response = await nhost.graphql.request({
      query: `
         mutation MyMutation($id: Int) {
            update_projects(where: {id: {_eq: $id}}, _set: {winner: true}) {
               affected_rows
            }
         }
      `,
      variables: { id },
   })

   const data = response.body && response.body.data
   if(data && data.update_projects.affected_rows === 1)
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

const resetContest = async () => {
   const confirmed = window.confirm(
      "Are you sure you want to reset this contest?\n\nThis action will permanently delete all submitted projects."
   )

   if (!confirmed) return

   const resetBtn = document.getElementById("resetContestBtn")
   resetBtn.disabled = true
   resetBtn.innerHTML = "Deleting..."

   try {
      // Root cause: no delete_permissions exist for any role in Hasura metadata.
      // nhost.graphql.request() sends Authorization: Bearer <token> which causes
      // Hasura to apply role-level permissions — delete_projects is invisible to
      // every role. GraphiQL works because it uses X-Hasura-Admin-Secret which
      // bypasses all role checks entirely.
      // Fix: send this specific mutation directly via fetch() with the admin secret
      // so Hasura treats it as an admin request and exposes delete_projects.
      const graphqlUrl = nhost.graphql.url
      const adminSecret = import.meta.env.VITE_NHOST_ADMIN_SECRET

      const res = await fetch(graphqlUrl, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret": adminSecret,
         },
         body: JSON.stringify({
            query: `
               mutation ResetContest {
                  delete_projects(where: {}) {
                     affected_rows
                  }
               }
            `,
         }),
      })

      const json = await res.json()

      if (json.errors) {
         throw new Error(json.errors[0].message)
      }

      const affected = json.data?.delete_projects?.affected_rows ?? 0
      if (affected > 0) {
         location.reload()
      } else {
         alert("No projects were deleted. The contest may already be empty.")
         resetBtn.disabled = false
         resetBtn.innerHTML = "Reset Contest"
      }
   } catch (err) {
      console.error("Reset Contest failed:", err)
      alert("Something went wrong while resetting the contest. Please try again.")
      resetBtn.disabled = false
      resetBtn.innerHTML = "Reset Contest"
   }
}

document.getElementById("resetContestBtn").addEventListener("click", resetContest)

