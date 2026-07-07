import{n as e,r as t,t as n}from"./nhost-DLnrXHa8.js";import{i as r,n as i,r as a,t as o}from"./helper-B4zLgMDW.js";t((()=>{n(),a(),i(),window.onload=async()=>{t()};var t=async()=>{let e=await f();e.length==0?p():m(e[0])},s=document.getElementById(`form`),c=s.querySelector(`button`),l=document.querySelector(`#form-section`),u=document.querySelector(`#winner-section`),d=async t=>{t.preventDefault();let n=new FormData(s),i=Object.fromEntries(n.entries());c.innerHTML=`Processing...`;let a=r`
                mutation MyMutation($title: String, $descriptiion:String, $link: String) {
                    insert_projects(objects: {description: $title, title: $descriptiion, link: $link}) {
                    affected_rows
                }
    }`,{data:o}=await e.graphql.request(a,i);o.insert_projects.affected_rows==1?h():g()},f=async()=>{let t=r`
      query {
         projects(where: {winner: {_eq: true}}) {
            link
            title
            description
          }
      }`,{data:n}=await e.graphql.request(t);return n.projects?n.projects:[]};s.addEventListener(`submit`,d);var p=()=>{l.classList.remove(`hidden`),u.remove()},m=e=>{u.classList.remove(`hidden`);let t=o(e);u.appendChild(t),l.remove()},h=()=>{c.outerHTML=`<p class="text-green-700">Your project is submitted. Wait for the results 🤞</p>`,s.reset()},g=()=>{alert(`Something went wrong. Please try again later`),c.innerHTML=`Submit Project`}}))();