//import { queryObjects } from "node:v8";

const input = document.getElementById("message");
const person = document.getElementById("teacher");
const button = document.getElementById("button");
const list = document.getElementById("list");
const search = document.getElementById("search");
const teacher_list = document.getElementById("teacher_list");
const teachers = ["H.S.","M.E.","M.K.","R.Y.","G.F.","Y.I.","T.H.","S.T.","H.I.","G.M.","T.I.","R.N.","N.S.","R.F"];
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
  if(posts.length==0){
    evaluation.textContent="";
    return;
  }
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
  let result = "";
  let result_color="";
  let total = Object.entries(assess).reduce((sum,element)=>{
    return sum+element[1]/posts.length/Object.entries(assess).length;
  },0)
  console.log(total);
  switch(Math.floor(total)){
    case 5:
    case 4:
      result="大仏";
      result_color="#1e90ff";
      break;
    case 3:
      result="仏";
      result_color="#add8e6";
      break;
    case 2:
      result="鬼";
      result_color="#f08080";
      break;
    case 1:
      result="大鬼";
      result_color="#800000";
      break;
  }
  console.log(result);
  let flag=document.createElement("strong");
  flag.textContent=result;
  flag.style.color=result_color;
  flag.style.fontSize="20px";
  evaluation.prepend(document.createElement("br"));
  evaluation.prepend(flag);
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
  form.reset();
});