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