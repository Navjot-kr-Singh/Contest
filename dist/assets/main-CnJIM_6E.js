import{t as e}from"./nhost-CzS9n_xH.js";import{t}from"./helper-TC72hGDy.js";window.onload=async()=>{n()};var n=async()=>{let e=await c();e.length==0?l():u(e[0])},r=document.getElementById(`form`),i=r.querySelector(`button`),a=document.querySelector(`#form-section`),o=document.querySelector(`#winner-section`),s=async t=>{t.preventDefault();let n=new FormData(r),a=Object.fromEntries(n.entries());i.innerHTML=`Processing...`;let o=await e.graphql.request({query:`
         mutation MyMutation($title: String, $description: String, $link: String) {
            insert_projects(objects: {title: $title, description: $description, link: $link}) {
               affected_rows
            }
         }
      `,variables:{title:a.title,description:a.description,link:a.link}});o.body&&o.body.data&&o.body.data.insert_projects.affected_rows==1?d():f()},c=async()=>{let t=await e.graphql.request({query:`
         query {
            projects(where: {winner: {_eq: true}}) {
               link
               title
               description
            }
         }
      `}),n=t.body&&t.body.data;return n&&n.projects?n.projects:[]};r.addEventListener(`submit`,s);var l=()=>{a.classList.remove(`hidden`),o.remove()},u=e=>{o.classList.remove(`hidden`);let n=t(e);o.appendChild(n),a.remove()},d=()=>{i.outerHTML=`<p class="text-green-700">Your project is submitted. Wait for the results 🤞</p>`,r.reset()},f=()=>{alert(`Something went wrong. Please try again later`),i.innerHTML=`Submit Project`};