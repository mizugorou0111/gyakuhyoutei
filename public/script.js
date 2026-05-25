//import { queryObjects } from "node:v8";

const input = document.getElementById("message");
const person = document.getElementById("teacher");
const button = document.getElementById("button");
const list = document.getElementById("list");
const search = document.getElementById("search");
const teacher_list = document.getElementById("teacher_list");
const teachers = ["H.S.","M.E.","M.K.","R.Y.","G.F.","Y.I.","T.H.","S.T"];
const evaluation = document.getElementById("evaluation");
const form =document.querySelector("#form");
teachers.forEach((value) => {
  let flag = document.createElement("option");
  flag.value=value
  teacher_list.appendChild(flag);
});
const update = async () => {
  const response = await fetch("/display", {
    method: "POST", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({teacher:search.value}),
  });
  const posts = await response.json();
  list.innerHTML = "";
  let assess = {};
  let values = []
  for(const property in posts[0]){
    if(Object.keys(property)!==id){
      console.log(values.push(Object.keys(property)));
    }
  }
  for (const post of posts) {
    const li = document.createElement("li");
    li.textContent = `${post.message}`;
    list.appendChild(li);
    for(let assessment of values){
      assess[assessment]+=post[assessment]
    }
  }
  evaluation.textContent =  "";
}
update();
search.addEventListener("change",update)
form.addEventListener("submit",async (event) => {
  event.preventDefault();
  console.log(Object.fromEntries(new FormData(form)));
  await fetch("/posts", {
    method: "POST", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(new FormData(form))),
  });
  update();
});