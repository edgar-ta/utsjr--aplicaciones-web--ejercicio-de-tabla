DROP DATABASE IF EXISTS aplicaciones_web;
CREATE DATABASE aplicaciones_web;
USE aplicaciones_web;

DROP TABLE IF EXISTS usuario;
CREATE TABLE IF NOT EXISTS usuario (
	id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(40) NOT NULL,
    cuatrimestre INT NOT NULL,
    carrera VARCHAR(40) NOT NULL,
    grupo INT NOT NULL,
    anio INT NOT NULL,
    
    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS categoria;
CREATE TABLE IF NOT EXISTS categoria (
	id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(40) NOT NULL,
    
    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS producto;
CREATE TABLE IF NOT EXISTS producto (
	id INT NOT NULL AUTO_INCREMENT,
    categoria INT NOT NULL,
    codigo VARCHAR(20) NOT NULL,
    nombre VARCHAR(40) NOT NULL,
    descuento DOUBLE,
    precio DOUBLE,
    stock INT,
    
    PRIMARY KEY(id),
    FOREIGN KEY(categoria) REFERENCES categoria(id)
		ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

INSERT INTO usuario VALUES 
(NULL, "Edgar Trejo Avila", 3, "TI", 2, 2023),
(NULL, "Francisco Arturo Munguia Lopez", 3, "TI", 2, 2023),
(NULL, "Carlos Enrique Villarreal Barron", 3, "TI", 2, 2023)
;

INSERT INTO categoria VALUES 
(NULL, "Electronicos"),
(NULL, "Linea blanca"),
(NULL, "Ropa y calzado")
;

INSERT INTO producto VALUES 
(NULL, 1, "", "iPad Pro", 0, 17500, 20),
(NULL, 1, "", "iPhone 13", 0, 23000, 15),
(NULL, 1, "", "MacBook Air 2022", 0, 25000, 12)
;
