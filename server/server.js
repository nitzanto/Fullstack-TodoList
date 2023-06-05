const express = require("express");
const app = express();
let { todos } = require("./models/Todos");
const { v4: uuidv4 } = require("uuid");

// parsing the json
app.use(express.json());

// parsing data
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome").status(200);
});

app.get("/api/todos", (req, res) => {
  res.status(200).json({ success: true, data: todos });
});

app.get("/api/todos/:id"),
  (req, res) => {
    const { id } = req.params;

    const aTodo = todos.find((e) => e.id === Number(id));
    if (!aTodo)
      return res
        .status(404)
        .json({ success: false, msg: `No todo item with id ${id}` });

    return res.status(200).json({ success: true, data: aTodo });
  };

app.post("/api/todos/"),
  (req, res) => {
    const { title, done } = req.body;

    // Creating a new todo item
    const newTodo = {
      id: uuidv4(),
      title,
      done,
    };

    // Send a response indicating the new todo item was created successfully
    res.status(201).json({ success: true, data: [...todos, newTodo] });
  };

app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, done } = req.body;

  const aTodo = todos.find((e) => e.id === Number(id));
  if (!aTodo)
    return res
      .status(404)
      .json({ success: false, msg: `No todo item with id ${id}` });

  const newTodoList = todos.map((item) => {
    if (item.id === Number(id))
      item = {
        title: title,
        done: done,
      };

    // Adding the items to the todo-list if they're not the one requested
    return item;
  });

  res.status(200).json({ success: true, data: newTodoList });
});

app.delete("api/todos/:id", (req, res) => {
  const { id } = req.params;

  const aTodo = todos.find((e) => e.id === Number(id));
  if (!aTodo)
    return res
      .status(404)
      .json({ success: false, msg: `No todo item with id ${id}` });

  const newTodoList = todos.filter((item) => item.id !== Number(req.params.id));

  return res.status(200).json({ success: true, data: newTodoList });
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
