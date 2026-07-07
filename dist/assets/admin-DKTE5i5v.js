import{t as e}from"./nhost-CzS9n_xH.js";import{t}from"./helper-TC72hGDy.js";import{a as n,i as r,t as i}from"./auth-CtiynMh_.js";document.getElementById(`signOutForm`).addEventListener(`submit`,async e=>{e.preventDefault(),await r(),window.location.href=n}),window.onload=async()=>{try{await e.refreshSession(0)}catch{}i()?await a():window.location.href=`login.html`};var a=async()=>{let t=await e.graphql.request({query:`
         query MyQuery {
            projects(order_by: {id: desc}) {
               id
               description
               link
               title
               winner
            }
         }
      `}),n=t.body&&t.body.data;n&&n.projects&&(c(n.projects),s(n.projects))},o=async t=>{let n=await e.graphql.request({query:`
         mutation MyMutation($id: Int) {
            update_projects(where: {id: {_eq: $id}}, _set: {winner: true}) {
               affected_rows
            }
         }
      `,variables:{id:t}}),r=n.body&&n.body.data;r&&r.update_projects.affected_rows===1&&location.reload()},s=e=>{let n=l(e);e.forEach(e=>{let r=t(e);if(n.length===0){let t=document.createElement(`button`);t.classList.add(`mt-2`,`rounded`,`bg-indigo-500`,`text-white`,`px-4`,`py-2`,`text-sm`,`font-bold`),t.innerHTML=`Select Winner`,t.addEventListener(`click`,()=>o(e.id)),r.append(t)}document.getElementById(`projects`).append(r)})},c=e=>{let n=l(e);if(n.length!==0){let e=t(n[0]);document.getElementById(`winner`).append(e),document.querySelector(`#winner > p`).remove()}},l=e=>e.filter(e=>e.winner===!0);