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
const axis = [...form.children].filter((val)=> val.tagName === "P"&&!(val.textContent.includes("コメント"))&&val.textContent!=="フォーム").map((val)=>val.textContent);
//axis.splice(0,2);
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
  values = Object.keys(posts[0])
  values.splice(0,3);
  console.log(values);
  for(let content of values){
    assess[content]=0;
  }
  for (const post of posts) {
    const li = document.createElement("li");
    li.textContent = `${post.message}`;
    list.appendChild(li);
    for(let content of values){
      assess[content]+=post[content]-0;
      console.log(post);
      console.log(post[content])
    }
  }
  console.log(Object.entries(assess));
  Object.entries(assess).forEach((val)=>console.log(val))
  evaluation.textContent = Object.entries(assess).map((val,num) => `${axis[num]}:${(val[1]-0)/posts.length}`).join(" ")
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