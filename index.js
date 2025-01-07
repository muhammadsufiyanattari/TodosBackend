import express, { json } from "express"
import cors from "cors"
const app = express();
const port = process.env.PORT || 3000; //jab backend deploy karte hen
//  to ye zarori nahi ke wo jo routes chala rahe he same is lye ye karte hen
app.use(cors())
let todos = [];
app.use(json()); // ye routes ko cheak karta he agar hoga to response de deta he
app.use(express.json()); //body incripted hoti he
// usse format me change karne ke lye  app.use ye karte he

// todo get requset jo user ko show karwni hi
app.get("/getTodos", (req, res) => {
  const message = !todos.length ? "Empty Todos" : "Data fetch Successfully !";
  res.send({ data: todos, message });
});

// todo add karne ke lye use kar data add karwane ke lye
app.post("/addTodo", (req, res) => {
  // console.log(req.body);
  const obj = {
    todoContent: req.body.todo,
    id: String(new Date().getTime()),
    Creates: new Date().getDate(),
  };
  todos.push(obj);
  res.status(200).send({ message: "Add Todo Successfully ! ", data: obj }); //todo add ho gae to ye message show ho
});

// selected  todo Edit karne ke lye
app.patch("/editTodo/:id", (req, res) => {
  const id = req.params.id;
  let isFound = false;
  for (let i = 0; i < todos.length; i++) {
    todos[i];
    if (todos[i].id === id) {
      todos[i].todoContent = req.body.todoContent;
      isFound = true;
      break;
    }
  }
  if (isFound) {
    res
      .status(201)
      .send({
        data: { todoContent: req.body.todoContent, id },
        message: "Todo Update Successfully !",
      });
  } else {
    res.status(201).send({ data: null, message: "Todo id Not Found !" });
  }
});

// selected  todo Delet karne ke lye

app.delete("/deletTodo/:id", (req, res) => {
  // res.send("hello");


  const id = req.params.id;
  let isFound = false;
  for (let i = 0; i < todos.length; i++) {
    todos[i];
    if (todos[i].id === id) {
     todos.splice(i,1)
     isFound=true
    }
  }
  if (isFound) {
    res
      .status(201)
      .send({
        data: { todoContent: req.body.todoContent, id },
        message: "Todo Delet Successfully !",
      });
  } else {
    res.status(201).send({ data: null, message: " Not Found !" });
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
