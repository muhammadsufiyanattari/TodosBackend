import express, { json } from "express";
import 'dotenv/config'
import cors from "cors";
// test

import "./databaseUri.js";
import { Todo } from "./models/Schema.js";
const app = express();
const port = process.env.PORT || 3000; //jab backend deploy karte hen
//  to ye zarori nahi ke wo jo routes chala rahe he same is lye ye karte hen
app.use(
  cors({
    origin: ["http://localhost:5173", "https://sufiyan-todo-frontend.surge.sh"],
  })
);

app.use(json()); // ye routes ko cheak karta he agar hoga to response de deta he
app.use(express.json()); //body incripted hoti he
// usse format me change karne ke lye  app.use ye karte he

// todo get requset jo user ko show karwni hi
app.get("/getTodos", async(req, res) => {
 try {
  const todos = await Todo.find({},
    //{todoContent:1}1 means show this field and 0 means not show this field
   {__v:0}   // 0 means not show this field
     //first parameter is for filter and second is for projection

  ).sort({_id:-1});
  const message = !todos.length ? "Empty Todos" : "Data fetch Successfully !";

  res.send({ data: todos, message });
  
 } catch (error) {
  res.status(500).send(` Internal Server Error ! `);
 }
});

// todo add karne ke lye use kar data add karwane ke lye
app.post("/addTodo",async (req, res) => {
  try {
    // console.log(req.body);
  const obj = {
    todoContent: req.body.todoContent,
    
  };
 const response=await  Todo.create(obj);
  console.log(response);
  // todos.push(obj);
  res.status(200).send({ message: "Add Todo Successfully ! ", data: response }); //todo add ho gae to ye message show ho
  } catch (error) {
    res.status(500).send(` Internal Server Error ! `);
  }
});

// selected  todo Edit karne ke lye
app.patch("/editTodo/:id", async(req, res) => {
 try {
  const id = req.params.id;
  const result=await Todo.findByIdAndUpdate(id, { todoContent: req.body.todoContent });
  // let isFound = false;
  // for (let i = 0; i < todos.length; i++) {
  //   todos[i];
  //   if (todos[i].id === id) {
  //     todos[i].todoContent = req.body.todoContent;
  //     isFound = true;
  //     break;
  //   }
  // }
  console.log(`result`, result);
  
  if (result) {
    res.status(201).send({
      data: result,
      message: "Todo Update Successfully !",
    });
  } else {
    res.status(201).send({ data: null, message: "Todo id Not Found !" });
  }
 } catch (error) {
  res.status(500).send(` Internal Server Error ! `);
 }
});

// selected  todo Delet karne ke lye

app.delete("/deletTodo/:id",async (req, res) => {
  // res.send("hello");

  const id = req.params.id;
  const result=await Todo.findByIdAndDelete(id);
  // let isFound = false;
  // for (let i = 0; i < todos.length; i++) {

  //   todos[i];
  //   if (todos[i].id === id) {
  //     todos.splice(i, 1);
      
  //     isFound = true;
  //     break;

  //   }
  // }
  
  if (result) {
    res.status(200).send({
      data: { id },
      message: "Todo Deleted Successfully !",
    });
  } else {
    res.status(404).send({ data: null, message: "Todo id Not Found !" });
  }
});
// agar user koi aese route pe jae jo he hi nahi to ye route show ho

app.use((req, res) => {
  console.log("Route is Not Found");

  res.status(404).send("Route is Not Found !");
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
