# api-users
CRUD de usuarios en node Js


# Crear un base de datos con el nombre que desea
create database nombre_base_de_datos


# Dentro de la base de datos ejecutar el siguinte script, esto creara una tabla llamada tbl_user y tambien añadira 2 registros a la misma
create table tbl_user (
	id_user serial primary key not null,
	nombre varchar,
	primer_apellido varchar,
	segundo_apellido varchar,
	cedula_identidad varchar(10),
	fecha_nacimiento date
);

insert into tbl_user ( nombre, primer_apellido, segundo_apellido, cedula_identidad, fecha_nacimiento )
	values ( 'Alvaro', 'Ortega', 'Delgadillo', '123456', '1997-09-10');

insert into tbl_user ( nombre, primer_apellido, segundo_apellido, cedula_identidad, fecha_nacimiento )
	values ( 'Roger', 'Coronado', 'Flores', '654321', '1985-11-22');


# Una vez dentro la carpeta de la aplicación ejecute el siguiente comando, esto para levantar la aplicación
node index.js 


# Despues de haber realizado todos los pasos anteriores ya esta listo para consumir los endPoint
# Obtiene todos los usuarios
GET  ->   http://localhost:3000/usuarios  


# Añade un usuario
POST  ->  http://localhost:3000/usuarios   
body: {
        "nombre": "nombre_Ejemplo",
        "primer_apellido": "AP_ejemplo",
        "segundo_apellido": "AP_ejemplo",
        "cedula_identidad": "123456",
        "fecha_nacimiento": "2000-01-01"
      }


# Obtiene un usuario por el ID
GET  ->   http://localhost:3000/usuarios/5 


# Elimina  aun usuario por el ID 
DELETE  ->   http://localhost:3000/usuarios/6 


# Actualiza la información de un usuario por el id
PUT  ->   http://localhost:3000/usuarios/5 
body: {
        "nombre": "nombre_Ejemplo",
        "primer_apellido": "AP_ejemplo",
        "segundo_apellido": "AP_ejemplo",
        "cedula_identidad": "123456",
        "fecha_nacimiento": "2000-01-01"
      }


# Obtiene la información del Proyecto
GET  ->   http://localhost:3000/estado


# Obtiene el promedio de edades de los usuarios
GET  ->   http://localhost:3000/usuarios/promedio-edad

