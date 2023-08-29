const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "user",
  password: "1234",
  port: "54320",
});

// Modelo
class Model {
  async getUsers() {
    const { rows } = await pool.query("select * from tbl_user;");
    return rows;
  }

  async getUserById(id) {
    const { rows } = await pool.query("select * from tbl_user where id = $1;", [
      id,
    ]);
    return rows[0];
  }

  async addUser(datos) {
    await pool.query("INSERT INTO tbl_user (nombre, primer_apellido, segundo_apellido, cedula_identidad, fecha_nacimiento) values ($1)", 
    [datos.name, datos.apellidoP, datos.apellidoM, datos.ci, datos.fecha]);
  }

  async updateItem(id, nombre) {
    await pool.query("UPDATE items SET nombre = $1 WHERE id = $2", [nombre, id]);
  }

  async deleteItem(id) {
    await pool.query("DELETE FROM tbl_user WHERE id = $1", [id]);
  }
}

//Controlador
class Controller {
  constructor(model) {
    this.model = model;
  }

  async getUsers(req, res) {
    const data = await this.model.getUsers();
    res.send(data);
  }

  async getUserById(req, res) {
    const id = req.params.id;
    const data = await this.model.getUserById(id);
    res.send(data);
  }

  async addUser(req, res) {
    const name = req.body.name;
    await this.model.addUser(name);
    res.sendStatus(201);
  }

  async updateItem(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    await this.model.updateItem(id, name);
    res.sendStatus(200);
  }

  async deleteItem(req, res) {
    const id = req.params.id;
    await this.model.deleteItem(id);
    res.sendStatus(200);
  }
}

//Instanciación
const model = new Model();
const controller = new Controller(model);

app.use(express.json());

app.get("/items", controller.getUsers.bind(controller));
app.get("/items/:id", controller.getUserById.bind(controller));
app.post("/items", controller.addUser.bind(controller));
app.put("/items/:id", controller.updateItem.bind(controller));
app.delete("/items/:id", controller.deleteItem.bind(controller));

app.listen(port, () => {
  console.log(`Este servidor se ejecuta en http://localhost:${port}`);
});

console.log("siiii");