"use strict";
const $ = selector => document.querySelector(selector);
const KEY="sorochat.messages.v1";
let messages=[];
function load(){try{const value=JSON.parse(localStorage.getItem(KEY)||"[]");messages=Array.isArray(value)?value:[];}catch{messages=[];}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(messages.slice(-300)));}catch(error){console.warn("Chat history could not be saved",error);}}
function render(){
 const feed=$("#feed");feed.replaceChildren();
 messages.forEach(item=>{
  const bubble=document.createElement("div");bubble.className="msg"+(item.mine?" mine":"");
  const text=document.createElement("p");text.textContent=item.text;
  const time=document.createElement("small");time.textContent=new Date(item.at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
  bubble.append(text,time);feed.append(bubble);
 });
 feed.scrollTop=feed.scrollHeight;
}
$("#form").addEventListener("submit",event=>{
 event.preventDefault();
 const input=$("#text"),text=input.value.trim();
 if(!text)return;
 messages.push({id:crypto.randomUUID?.()||String(Date.now()),text,at:Date.now(),mine:true});
 input.value="";save();render();input.focus();
});
$("#clearChat").addEventListener("click",()=>{
 if(!messages.length)return;
 if(!confirm("Clear the messages saved in this browser?"))return;
 messages=[];save();render();
});
load();render();