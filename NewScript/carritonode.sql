-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 07-08-2018 a las 19:16:55
-- Versión del servidor: 5.7.21
-- Versión de PHP: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `carritonode`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FOREIGN_CART` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cartdetails`
--

DROP TABLE IF EXISTS `cartdetails`;
CREATE TABLE IF NOT EXISTS `cartdetails` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `producto` int(11) NOT NULL,
  `cart` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FOREIGN_PROD` (`producto`),
  KEY `FOREIGN_CAR` (`cart`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE IF NOT EXISTS `clientes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(1000) NOT NULL,
  `correo` varchar(1000) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
CREATE TABLE IF NOT EXISTS `comentarios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `autor` varchar(1000) NOT NULL,
  `comentario` text NOT NULL,
  `fecha` date NOT NULL,
  `producto` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `producto` (`producto`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `comentario` text NOT NULL,
  `producto` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FOREIGN_USER` (`user`) USING BTREE,
  KEY `FOREIGN_PRODUCTO` (`producto`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `comment`
--

INSERT INTO `comment` (`ID`, `fecha`, `comentario`, `producto`, `user`) VALUES
(1, '2018-08-02 14:23:28', 'bonito diseño y presentación', 1, 5),
(8, '2018-08-03 21:22:31', 'Excelente libro me gusta!', 3, 5),
(9, '2018-08-07 13:35:34', 'Me encanta el manual', 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE IF NOT EXISTS `customers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(1000) NOT NULL,
  `apellidos` varchar(1000) NOT NULL,
  `correo` varchar(1000) NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `customers`
--

INSERT INTO `customers` (`ID`, `nombre`, `apellidos`, `correo`, `fecha`) VALUES
(1, 'Daryl asdrúbal', 'Segovia Alonzo', 'daryl_segovia_vendedor-buyer@hotmail.com', '2018-08-07 21:23:21'),
(2, 'Edwin', 'Chi Moo', 'alejandrochi1996-buyer@gmail.com', '2018-08-07 22:03:50'),
(3, 'Walter Azael', 'Escamilla Pech', 'walteresc-buyer@outlook.es', '2018-08-07 22:10:09'),
(4, 'José Rogelio', 'Chac Cobá', 'jr.coba94-buyer@gmail.com', '2018-08-03 22:15:01'),
(6, 'Walter', 'Escamilla', 'walteresc@outlook.com', '2018-08-07 14:08:29'),
(7, 'Edwin', 'chi moo', 'edwinalejandrochi1996@hotmail.com', '2018-08-07 14:11:10'),
(8, 'prueba', 'prueba', 'prueba@gmail.com', '2018-08-07 14:15:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descargas`
--

DROP TABLE IF EXISTS `descargas`;
CREATE TABLE IF NOT EXISTS `descargas` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `producto` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FOREIGN_U` (`user`),
  KEY `FOREIGN_P` (`producto`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `descargas`
--

INSERT INTO `descargas` (`ID`, `user`, `producto`, `fecha`) VALUES
(1, 2, 1, '2018-08-02 05:35:10'),
(2, 6, 7, '2018-08-02 13:48:26'),
(3, 5, 2, '2018-08-02 14:26:17'),
(4, 5, 4, '2018-08-02 18:37:32'),
(10, 5, 2, '2018-08-03 20:07:35'),
(11, 5, 3, '2018-08-03 20:07:35'),
(12, 5, 9, '2018-08-03 20:10:11'),
(13, 5, 6, '2018-08-03 20:10:11'),
(14, 5, 1, '2018-08-03 20:10:11'),
(15, 5, 11, '2018-08-03 20:10:11'),
(16, 6, 1, '2018-08-03 20:37:52'),
(17, 5, 6, '2018-08-03 21:13:22'),
(18, 5, 3, '2018-08-03 21:23:21'),
(19, 2, 11, '2018-08-03 22:03:50'),
(20, 2, 5, '2018-08-03 22:10:09'),
(21, 2, 8, '2018-08-03 22:10:09'),
(22, 2, 3, '2018-08-03 22:15:01'),
(23, 2, 2, '2018-08-03 22:15:01'),
(24, 2, 4, '2018-08-03 22:35:18'),
(25, 2, 1, '2018-08-03 22:35:18'),
(26, 2, 3, '2018-08-03 22:35:18'),
(27, 2, 2, '2018-08-03 22:35:18'),
(28, 5, 8, '2018-08-07 14:08:29'),
(29, 6, 1, '2018-08-07 14:11:10'),
(30, 7, 5, '2018-08-07 14:15:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payments`
--

DROP TABLE IF EXISTS `payments`;
CREATE TABLE IF NOT EXISTS `payments` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `payment_date` date NOT NULL,
  `payment_amount` decimal(10,2) NOT NULL,
  `customer` varchar(1000) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `payments`
--

INSERT INTO `payments` (`ID`, `payment_date`, `payment_amount`, `customer`) VALUES
(1, '2018-08-06', '750.00', 'Daryl');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(1000) NOT NULL,
  `descripcion` text NOT NULL,
  `imagen` varchar(1000) NOT NULL,
  `autor` varchar(1000) NOT NULL,
  `tecnologia` varchar(1000) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `existencia` int(11) NOT NULL,
  `vendidos` int(11) NOT NULL,
  `archivo` varchar(1000) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`ID`, `titulo`, `descripcion`, `imagen`, `autor`, `tecnologia`, `precio`, `existencia`, `vendidos`, `archivo`) VALUES
(1, 'Manual de Calculadora IMC ', 'Manual digital realizado con node.js y express para crear una aplicación web', 'IMC.jpg', 'Daryl', 'Node.js y Express', '750.00', 0, 5, 'IMC(NodeJs y Express).pdf'),
(2, 'Manual Crop de imagenes en node.js', 'Manual digital para la creación de un Crop de imagenes', 'Nodejs.png', 'Walter Escamilla', 'Node.js y Express', '50.00', 689, 6, 'JCrop(NodeJs y Express).pdf'),
(3, 'Manual CRUD en Firebase', 'Manual digital para la creación de un CRUD usando Firebase', 'lib5.jpg', 'Rogelio Chac', 'Node.js y Express', '150.00', 24, 2, 'CRUD(NodeJs y Express).pdf'),
(4, 'Manual de instalación de MYSQL', 'Manual de instalación paso a paso para MySQL', 'MySQL.png', 'Daryl ', 'Base de datos', '350.00', 3, 57, 'MySQL.pdf'),
(5, 'Manual de instalación de Arduino', 'Manual para instalar Arduino', 'Arduino.png', 'Rogelio Chac', 'IDE Arduino', '170.00', 16, 6, 'Arduino.pdf'),
(6, 'Manual Visual Studio Code', 'Manual para instalas VS Code', 'VisualStudioCode.png', 'Edwin', 'IDE VS Code', '490.00', 18, 25, 'VSCode.pdf'),
(7, 'Manual de instalacion de Notepad++', 'Manual para instalar Notepad++', 'Notepadplusplus.png', 'Daryl', 'IDE de desarrollo', '820.00', 45, 12, 'Notepad.pdf'),
(8, 'Manual de instalación de Node.js', 'Manual para instalar node.js y express', 'Nodejs.png', 'Edwin', 'Node.js', '756.00', 91, 12, 'Nodejs.pdf'),
(9, 'Libro de Visual Basic', 'Libro digital para aprender Visual Basic y VB.NET', 'VisualBasicNET.png', 'Walter', 'Visual Basic', '989.00', 66, 68, 'LibroVB.pdf'),
(11, 'Libro de JavaScript', 'Manual para crear aprender JavaScript', 'JavaScript1.png', 'Edwin', 'JavaScript', '155.00', 23, 10, 'JavaScript1.pdf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tecnologias`
--

DROP TABLE IF EXISTS `tecnologias`;
CREATE TABLE IF NOT EXISTS `tecnologias` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(1000) NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tecnologias`
--

INSERT INTO `tecnologias` (`ID`, `nombre`, `descripcion`) VALUES
(1, 'Node.js', 'es un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor'),
(2, 'Angular.js', 'es un framework de JavaScript de código abierto.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(1000) NOT NULL,
  `apellidos` varchar(1000) NOT NULL,
  `username` varchar(1000) NOT NULL,
  `email` varchar(1000) NOT NULL,
  `pass` varchar(1000) NOT NULL,
  `usertype` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FOREIGN` (`usertype`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`ID`, `nombre`, `apellidos`, `username`, `email`, `pass`, `usertype`) VALUES
(1, 'jose', 'chac coba', 'admin', 'jr.coba94@gmail.com', '12345', 1),
(2, 'Daryl', 'Segovia', 'admin', 'daryl_segovia@hotmail.com', '12345', 1),
(5, 'Walter', 'Escamilla', 'walter', 'walteresc@outlook.com', '12345', 2),
(6, 'Edwin', 'chi moo', 'edwin', 'edwinalejandrochi1996@hotmail.com', '12345', 2),
(7, 'prueba', 'prueba', 'prueba', 'prueba@gmail.com', '12345', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usertype`
--

DROP TABLE IF EXISTS `usertype`;
CREATE TABLE IF NOT EXISTS `usertype` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(1000) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usertype`
--

INSERT INTO `usertype` (`ID`, `nombre`) VALUES
(1, 'administrador'),
(2, 'usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(1000) NOT NULL,
  `pass` varchar(1000) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

DROP TABLE IF EXISTS `ventas`;
CREATE TABLE IF NOT EXISTS `ventas` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `payerid` varchar(1000) NOT NULL,
  `paymentid` varchar(1000) NOT NULL,
  `cliente` varchar(1000) NOT NULL,
  `productos` varchar(1000) NOT NULL,
  `fecha` datetime NOT NULL,
  `total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`ID`, `payerid`, `paymentid`, `cliente`, `productos`, `fecha`, `total`) VALUES
(1, 'NHZV9UQ3ZT4N8', 'PAY-3A156344UC765661VLNSR5XQ', 'Daryl Segovia', 'Manual digital realizado con node.js y express para crear una aplicación web', '2018-08-07 22:35:18', '970.00'),
(2, '232WNTW5BMWY2', 'PAY-6D758647LR637464FLNU64HQ', 'Walter', 'Manual de instalación de Node.js / ', '2018-08-07 14:08:29', '756.00'),
(3, '232WNTW5BMWY2', 'PAY-08K97255DA8734218LNU65OY', 'Edwin', 'Manual de instalación de Node.js / Manual de Calculadora IMC  / ', '2018-08-07 14:11:10', '750.00'),
(4, '2SJKVQ9DSQRD6', 'PAY-7GH29251HU589340RLNU67LI', 'prueba', 'Manual de instalación de Arduino / ', '2018-08-07 14:15:46', '170.00');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `FOREIGN_CART` FOREIGN KEY (`user`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cartdetails`
--
ALTER TABLE `cartdetails`
  ADD CONSTRAINT `FOREIGN_CAR` FOREIGN KEY (`cart`) REFERENCES `cart` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FOREIGN_PROD` FOREIGN KEY (`producto`) REFERENCES `productos` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`producto`) REFERENCES `productos` (`ID`);

--
-- Filtros para la tabla `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `FOREIGN` FOREIGN KEY (`user`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`producto`) REFERENCES `productos` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `descargas`
--
ALTER TABLE `descargas`
  ADD CONSTRAINT `FOREIGN_P` FOREIGN KEY (`producto`) REFERENCES `productos` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FOREIGN_U` FOREIGN KEY (`user`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `praimary` FOREIGN KEY (`usertype`) REFERENCES `usertype` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
