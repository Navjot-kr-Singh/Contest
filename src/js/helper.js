const createProjectNode = (project) => {
   const div = document.createElement("div")
   div.classList.add("p-5", "shadow-md", "bg-white", "mt-4")
   div.innerHTML = `<h2 class="text-xl font-bold">${project.title}</h2>
   <p class="mt-2 text-sm">
   ${project.description}
   </p>
   <a href="${project.link}" class="text-blue-700 text-sm mt-2 block">View project</a>`

   return div
}

export { createProjectNode }
