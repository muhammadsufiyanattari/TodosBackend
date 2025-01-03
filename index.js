import express, { json } from "express";

const app = express();
const port = process.env.PORT || 3000; //jab backend deploy karte hen
//  to ye zarori nahi ke wo jo routes chala rahe he same is lye ye karte hen
let todos = [];
app.use(json()); // ye routes ko cheak karta he agar hoga to response de deta he
app.use(express.json()); //body incripted hoti he
// usse format me change karne ke lye  app.use ye karte he

// todo get requset jo user ko show karwni hi
app.get("/getTodos", (req, res) => {
  res.send(todos);
});

// todo add karne ke lye use kar data add karwane ke lye
app.post("/addTodo", (req, res) => {
  todos.push({ data: req.body.todo, id: new Date().getTime() });
  res.status(200).send("Add Todo Successfully ! "); //todo add ho gae to ye message show ho
});

// selected  todo Edit karne ke lye
app.patch("/editTodo/:id", (req, res) => {
  res.send("hello");
});

// selected  todo Delet karne ke lye

app.delete("/deletTodo/:id", (req, res) => {
  res.send("hello");
});
// agar user koi aese route pe jae jo he hi nahi to ye route show ho

app.use((req, res) => {
  console.log("Route is Not Found");

  res.status(404).send("Route is Not Found !");
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
