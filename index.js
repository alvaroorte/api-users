const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "user",
  password: "1234",
  port: "5432",
});

// Modelo
class Model {
  async getUsers() {
    const { rows } = await pool.query("select * from tbl_user;");
    return rows;
  }

  async getUserById(id) {
    const { rows }  = await pool.query("select * from tbl_user where id_user = $1;", [
      id,
    ]);
    return rows[0];
  }

  async addUser(datos) {
    await pool.query("INSERT INTO tbl_user (nombre, primer_apellido, segundo_apellido, cedula_identidad, fecha_nacimiento) values ($1,$2,$3,$4,$5)", 
    [datos.nombre, datos.primer_apellido, datos.segundo_apellido, datos.cedula_identidad, datos.fecha_nacimiento]);
  }

  async updateItem(id, datos) {
    await pool.query(`UPDATE tbl_user SET  nombre = $1, 
                                        primer_apellido = $2, 
                                        segundo_apellido = $3, 
                                        cedula_identidad = $4, 
                                        fecha_nacimiento = $5 
                      WHERE id_user = $6`, [datos.nombre, datos.primer_apellido, datos.segundo_apellido, datos.cedula_identidad, datos.fecha_nacimiento, id]);
  }

  async deleteItem(id) {
    await pool.query("DELETE FROM tbl_user WHERE id_user = $1", [id]);
  }
  
  async getAVGEdad() {
    const { rows } = await pool.query(`SELECT  ROUND(AVG(EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)))::numeric, 2) AS promedio_edades 
                      FROM tbl_user`);
    console.log(rows);
    return rows
                      
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
    const body = req.body;
    await this.model.addUser(body);
    res.sendStatus(201);
  }

  async updateItem(req, res) {
    const id = req.params.id;
    const body = req.body;
    await this.model.updateItem(id, body);
    res.sendStatus(200);
  }

  async deleteItem(req, res) {
    const id = req.params.id;
    await this.model.deleteItem(id);
    res.sendStatus(200);
  }
  
  async getEstado(req, res) {
    let datos = { nameSystem: 'api-users', 
                 version: '0.0.1',
                 developer: 'Alvaro Alejandro Ortega Delgadillo',
                 email: 'alvaroortega801@gmail.com'
                };
    res.send(datos);
  }

  async getAVGEdad(req, res) {
    const edad = await this.model.getAVGEdad();
    res.send(edad);
  }
}

//Instanciación
const model = new Model();
const controller = new Controller(model);

app.use(express.json());

app.get("/usuarios", controller.getUsers.bind(controller));
app.get("/usuarios/:id", controller.getUserById.bind(controller));
app.post("/usuarios", controller.addUser.bind(controller));
app.put("/usuarios/:id", controller.updateItem.bind(controller));
app.delete("/usuarios/:id", controller.deleteItem.bind(controller));
app.get("/estado", controller.getEstado.bind(controller));
app.get("/usuarios/promedio-edad", controller.getAVGEdad.bind(controller));

app.listen(port, () => {
  console.log(`Este servidor se ejecuta en http://localhost:${port}`);
});
