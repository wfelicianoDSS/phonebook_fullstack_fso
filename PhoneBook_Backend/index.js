const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3001;

const data = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :body",
    {
      skip: (req) => req.method !== "POST",
    },
  ),
);

app.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});

app.get("/api/persons", (req, res) => {
  res.json(data);
});

app.get("/api/persons/:id", (req, res) => {
  if (!req.params.id) {
    res.sendStatus(400);
  }

  const id = req.params.id;
  const person = data.filter((d) => d.id === id);
  if (person) {
    res.json(person);
  } else {
    res.sendStatus(404);
  }
});

app.post("/api/persons", (req, res) => {
  const maxId =
    notes.length > 0 ? Math.max(...data.map((d) => Number(d.id))) : 0;
  if (!req.body) {
    req.sendStatus(400);
  } else if (!req.body.name) {
    req.status(400).json({ error: "Name is required but is missing." });
  } else if (!req.body.number) {
    req.status(400).json({ error: "Number is required but is missing" });
  } else {
    const person = req.body;
    data.concat(person);
    res.json(person);
  }
});

app.put("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const duplicate = data.filter((d) => d.name === req.body.name);
  if (!req.body) {
    req.sendStatus(400);
  } else if (!req.body.name) {
    req.status(400).json({ error: "Name is required but is missing." });
  } else if (!req.body.number) {
    req.status(400).json({ error: "Number is required but is missing" });
  } else if (duplicate) {
    req.status(400).json({ error: "Name is already on PhoneBook" });
  } else {
    const personToUpdate = person.filter((p) => p.id === id);
    if (!personToUpdate) {
      res.sendStatus(404);
    } else {
      const person = req.body;
      data = data.map((d) => (d.id === id ? person : d));
      res.status(204).json(person);
    }
  }
});

app.delete("api/persons/:id", (req, res) => {
  const personToDelete = data.filter((d) => d.id === req.params.id);
  if (!personToDelete) {
    res.sendStatus(404);
  } else {
    data = data.filter((d) => {
      d.id !== req.params.id;
    });
  }
});

app.get("/info", (req, res) => {
  res.send(
    `PhoneBook has ${data.length} people<br>${req.requestTime.toString()}`,
  );
});

app.listen(PORT, () =>
  console.log(`Server Listening on: http://localhost:${PORT}`),
);
