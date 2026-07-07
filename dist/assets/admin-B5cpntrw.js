import{n as e,r as t,t as n}from"./nhost-DLnrXHa8.js";import{i as r,n as i,r as a,t as o}from"./helper-B4zLgMDW.js";import{a as s,n as c,o as l,t as u}from"./auth-DDlUk06G.js";var d=t((()=>{u(),document.getElementById(`signOutForm`).addEventListener(`submit`,async e=>{e.preventDefault(),await s(),window.location.href=l})})),f=t((()=>{u(),a(),n(),i(),window.onload=async()=>{await c()?await t():window.location.href=`login.html`};var t=async()=>{let t=r`
    query MyQuery {
    projects(order_by: {id: desc}) {
        id
        description
        link
        title
        winner
    }
    }`,{data:n}=await e.graphql.request(t);n.projects&&(d(n.projects),l(n.projects))},s=async t=>{let n=r`
   mutation MyMutation($id: Int) {
      update_projects(where: {id: {_eq: $id}}, _set: {winner: true}) {
        affected_rows
      }
    }`,{data:i}=await e.graphql.request(n,{id:t});i.update_projects.affected_rows===1&&location.reload()},l=e=>{let t=f(e);e.forEach(e=>{let n=o(e);if(t.length===0){let t=document.createElement(`button`);t.classList.add(`mt-2`,`rounded`,`bg-indigo-500`,`text-white`,`px-4`,`py-2`,`text-sm`,`font-bold`),t.innerHTML=`Select Winner`,t.addEventListener(`click`,()=>s(e.id)),n.append(t)}document.getElementById(`projects`).append(n)})},d=e=>{let t=f(e);if(t.length!==0){let e=o(t[0]);document.getElementById(`winner`).append(e),document.querySelector(`#winner > p`).remove()}},f=e=>e.filter(e=>e.winner===!0)}));d(),f();