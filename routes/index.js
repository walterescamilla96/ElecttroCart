var express = require('express');
var router = express.Router();

var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
router.use(fileUpload());
var mysql = require('mysql');

var moment = require('moment-timezone');

var https = require('https');
var querystring = require('querystring');

//Crear variable de acceso a MySQL
var db = require('../models/conexion');


//var Product = require('../models/producto');
var paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'Aaw4yqeZhJGIEKi5mP2RtMfcz73Nr27zvTcwkpyr9oMNn2wkzGSxaSSIxS8cHDVwfbnAFNywIjMZiogs',
  'client_secret': 'EO_cCVPcZtss2AFf3XKbXZvePr6MZZdgTBYLf4fQlFfLfoVGcTkb1c3DiE2xegTYACQeIC1A5LpmQZar'
});





router.get('/', function (req, res, next) {
  db.query("SELECT * FROM productos ORDER BY vendidos DESC LIMIT 5", function (err, resultados) {
    if (err) throw err;
    console.log(resultados);
    res.render('index', { title: 'Inicio', documentos: resultados })
  });
});



router.get('/acercade', function (req, res, next) {
  res.render('acercade', { title: 'Acerca De' });
});

router.get('/login', function (req, res, next) {

  if (req.session.usertype) {
    switch (req.session.usertype) {
      case 1:
        res.redirect('/panelProductos');
        break;
      case 2:
        res.redirect('/panelUsuario');
        break;
      default:
        res.render('login', { title: 'Login' });
    }
  }
  else {
    res.render('login', { title: 'Login' });
  }

});

//Esto es para comprobar si hay una SESSION creada y si la hay, redirijir dependiendo de si es Admin o Usuario normal

router.get('/logout', function (req, res) {
  delete req.session.usertype;
  delete req.session.userid;
  res.redirect('/login');
});

router.post('/login', function (req, res, next) {
  db.query("SELECT ID, username, pass, usertype FROM user WHERE username = '" + req.body.username + "' AND pass = '" + req.body.password + "'", function (err, resultados) {
    if (err) throw err;
    if (resultados[0]) {
      switch (resultados[0].usertype) {
        case 1:
          req.session.usertype = 1;
          res.redirect('/panelProductos');
          break;
        case 2:
          req.session.usertype = 2;
          req.session.userid = resultados[0].ID;
          res.redirect('/panelUsuario');
          break;
        default:
          res.redirect('/login');
      }
    }
    else {
      res.redirect('/login');
    }
  });
});

router.get('/Cart', function (req, res, next) {

  res.render('cart', { title: 'Carrito' });

});

router.get('/RecuperarCarro', function (req, res, next) {

  switch (req.session.usertype) {
    case 1:
      res.redirect('/');
      break;
    case 2:

      db.query("SELECT * FROM cart where user = ?", req.session.userid, function (err, resultados) {
        if (err) throw err;

        if (resultados) {

          db.query("SELECT user.ID as user, productos.ID as productoId, productos.titulo as producto, productos.imagen as imagen, productos.precio as precio, cart.ID as cart FROM productos INNER JOIN cartdetails ON productos.ID = cartdetails.producto INNER JOIN cart ON cart.ID = cartdetails.cart INNER JOIN user ON user.ID = cart.user WHERE user = " + req.session.userid + " GROUP BY  producto,cart", function (err, resultat) {
            if (err) throw err;
            if (resultat) {

              console.log(resultat);
              console.log(resultat.length);

              db.query("SELECT user.ID as user, productos.titulo as producto, productos.imagen as imagen, productos.precio as precio, SUM(precio) as total, cart.ID as cart FROM productos INNER JOIN cartdetails ON productos.ID = cartdetails.producto INNER JOIN cart ON cart.ID = cartdetails.cart INNER JOIN user ON user.ID = cart.user WHERE user = " + req.session.userid + " GROUP BY producto,cart", function (err, resTotal) {
                res.render('cart', { carrito: resultat, resTotal });
              });


            }
            else {
              console.log(resultat);
            };

          });

        }
        else {

          var carro = {
            user: req.session.userid
          };

          db.query("INSERT INTO cart SET ?", carro, function (err, res) {
            if (err) throw err;

            db.query("SELECT user.ID as user, productos.titulo as producto, productos.imagen as imagen, productos.precio as precio, cart.ID as cart FROM productos INNER JOIN cartdetails ON productos.ID = cartdetails.producto INNER JOIN cart ON cart.ID = cartdetails.cart INNER JOIN user ON user.ID = cart.user WHERE user = " + req.session.userid + " GROUP BY producto,cart", function (err, resultat) {
              if (err) throw err;
              if (resultat) {

                console.log(resultat);
                console.log(resultat.length);

                db.query("SELECT user.ID as user, productos.titulo as producto, productos.imagen as imagen, productos.precio as precio, SUM(precio) as total, cart.ID as cart FROM productos INNER JOIN cartdetails ON productos.ID = cartdetails.producto INNER JOIN cart ON cart.ID = cartdetails.cart INNER JOIN user ON user.ID = cart.user WHERE user = " + req.session.userid + " GROUP BY producto,cart", function (err, resTotal) {
                  res.render('cart', { carrito: resultat, resTotal });
                });


              }
              else {
                console.log(resultat);
              };

            });

          });
        }
      });

      break;
    default:
      res.redirect('/login');
  }
});

router.get('/AgregarAlCarro/:id', function (req, res, next) {

  switch (req.session.usertype) {
    case 1:
      res.redirect('/');
      break;
    case 2:

      db.query("SELECT * FROM cart where user = ?", req.session.userid, function (err, resultados) {
        if (err) throw err;

        if (resultados[0]) {

          var detalleCarro = {
            producto: req.params.id,
            cart: resultados[0].ID

          };

          console.log('//Valor detalleCarro array');
          console.log(detalleCarro);
          console.log(req.params.id);
          console.log('///');


          db.query("SELECT * FROM cartdetails WHERE producto = " + req.params.id + " AND cart = ?", resultados[0].ID, function (err, resul) {

            if (!resul[0]) {

              db.query("INSERT INTO cartdetails SET ?", detalleCarro, function (err, result) {

                console.log('//Valor post inserción');
                console.log(result);
                console.log(result[0]);
                res.redirect('/RecuperarCarro');

              });

            } else {

              res.redirect('/RecuperarCarro');

            }

          });

        }
        else {

          var carro = {
            user: req.session.userid
          };

          db.query("INSERT INTO cart SET ?", carro, function (err, primer_res) {
            if (err) throw err;

            db.query("SELECT * FROM cart where user = ?", req.session.userid, function (err, resultados) {
              if (err) throw err;

              if (resultados[0]) {

                var detalleCarro = {
                  producto: req.params.id,
                  cart: resultados[0].ID

                };

                db.query("INSERT INTO cartdetails SET ?", detalleCarro, function (err, result) {

                  res.redirect('/RecuperarCarro');

                });
              }
              else {
                res.redirect('/RecuperarCarro');
              }
            });

          });
        }
      });

      break;
    default:
      res.redirect('/login');
  }

});

router.get('/QuitarDelCarro/:id', function (req, res, next) {
  switch (req.session.usertype) {
    case 1:
      res.redirect('/');
      break;
    case 2:

      db.query("DELETE FROM cartdetails WHERE producto = ?", req.params.id, function (err, resultados) {
        if (err) throw err;
        console.log(resultados);
        res.redirect('/RecuperarCarro');
      });

      break;
    default:
      res.redirect('/login');
  }
});


router.get('/Productos', function (req, res, next) {


  db.query("SELECT * FROM productos", function (err, resultados) {

    if (err) throw err;
    console.log(resultados);
    res.render('productos', { title: 'Productos', documentos: resultados })
  });
});

router.get('/detalleProducto/:id', function (req, res, next) {

  db.query("SELECT * FROM productos WHERE id = ?", req.params.id, function (err, resultados) {
    var documentos = resultados;
    //res.render('detalleProducto', { title: 'Detalle', documentos: resultados });

    db.query("SELECT comment.comentario as comentario, comment.fecha as fecha, user.username as user FROM comment INNER JOIN user ON comment.user = user.id WHERE producto = ? ORDER BY fecha desc",
      req.params.id, function (err, resultados) {


        res.render('detalleProducto', { title: 'Detalle', documentos, comentarios: resultados });
      });
  });


});


router.post('/enviarComentario/:id', function (req, res, next) {

  var idProd = req.params.id;

  switch (req.session.usertype) {
    case 1:
      res.redirect("/detalleProducto/" + idProd + "");
      break;
    case 2:
      var comentario = {
        fecha: moment(new Date()).tz('America/Mexico_City').format('YYYY-MM-DD HH:mm:ss'),
        comentario: req.body.comment,
        producto: idProd,
        user: req.session.userid
      }

      db.query("INSERT INTO comment SET ?", comentario, function (err, resultados) {

        res.redirect("/detalleProducto/" + idProd + "");

      });
      break;
    default:
      //res.redirect("/detalleProducto/" + idProd + "");
      res.redirect('/login');
      break;
  }


  /*db.query("SELECT * FROM productos WHERE id = ?", req.params.id, function (err, resultados) {
    console.log(resultados);
    res.render('detalleProducto', { title: 'Detalle', documentos: resultados });
  });*/
});

router.get('/panelUsuario', function (req, res, next) {

  switch (req.session.usertype) {
    case 1:
      res.redirect('/panelProductos');
      break;
    case 2:

      db.query("SELECT productos.titulo as producto, productos.imagen as imagen, productos.archivo as archivo, descargas.fecha as fecha FROM productos INNER JOIN descargas ON descargas.producto = productos.ID INNER JOIN user ON user.ID = descargas.user WHERE user.ID = ? ORDER BY fecha desc",
        req.session.userid, function (err, resultados) {
          if (err) throw err;
          console.log(resultados);
          res.render('panelUsuario', { title: 'Panel', documentos: resultados });
        });

      break;
    default:
      res.redirect('/login');
  }

});


//Admin---------------------------------------------------------------------------------------------------------

router.get('/panelProductos', function (req, res, next) {

  switch (req.session.usertype) {
    case 1:
      db.query("SELECT * FROM productos", function (err, resultados) {
        if (err) throw err;
        console.log(resultados);
        res.render('panelProductos', { documentos: resultados })
      });
      break;
    case 2:
      res.render('panelUsuario', { title: 'Panel' });
      break;
    default:
      res.redirect('/login');
  }

});



router.post('/filtrado', function (req, res, next) {
  //Variable a validad
  //SQL para acceder a MySQL y devolver los datos de un arreglo
  db.query("SELECT * FROM productos where titulo LIKE '%" + req.body.busqueda + "%'", function (err, resultados) {
    res.render('panelProductos', { title: 'Productos', documentos: resultados });

  });

});



router.get('/DELETE/:id', function (req, res, next) {

  db.query("DELETE FROM productos WHERE id = ?", req.params.id, function (err, resultados) {
    if (err) throw err;
    console.log(resultados);
    res.redirect('/panelProductos');
  });

});



router.get('/panelEdit/:id', function (req, res, next) {
  //Variable a validad
  //SQL para acceder a MySQL y devolver los datos de un arreglo
  switch (req.session.usertype) {
    case 1:
      db.query("SELECT * FROM productos WHERE id = ?", req.params.id, function (err, resultados) {
        console.log(resultados);
        res.render('panelEdit', { title: 'Modificar', documentos: resultados[0] });
      });
      break;
    case 2:
      res.render('panelUsuario', { title: 'Panel' });
      break;
    default:
      res.redirect('/login');
  }


});

router.post('/panelEdit/:id/:imagen/:archivo/:vendidos', function (req, res, next) {
  //Variable a validad
  var img, arch;

  if (!req.files.imagen) {
    img = req.params.imagen;
  }
  else {
    let imagenASubir = req.files.imagen;

    let archivoASubir = req.files.archivo;
    imagenASubir.mv('public/imagesProductos/' + req.files.imagen.name, function (err, resultados) {
      if (err)
        return res.status(500).send(err);
    });

    img = req.files.imagen.name;
  }



  if (!req.files.archivo) {
    arch = req.params.archivo;
  }
  else {
    let archivoASubir = req.files.archivo;

    archivoASubir.mv('public/archivosProductos/' + req.files.archivo.name, function (err, resultados) {
      if (err)
        return res.status(500).send(err);
    });

    arch = req.files.archivo.name;
  }


  var producto = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    imagen: img,
    autor: req.body.autor,
    tecnologia: req.body.tecnologia,
    precio: req.body.precio,
    archivo: arch,
    existencia: req.body.stock,
    vendidos: req.params.vendidos
  }

  console.log(req.params.id);
  console.log(producto);
  //SQL para acceder a MySQL y devolver los datos de un arreglo
  db.query("UPDATE productos SET ? WHERE id = " + req.params.id + "", producto, function (err, resultados) {
    res.redirect('/panelProductos');
  });

});

router.get('/404', function (req, res, next) {
  res.render('404', { title: 'Enhorabuena' });
});


router.get('/panelVentas', function (req, res, next) {



  switch (req.session.usertype) {
    case 1:
      db.query("SELECT * FROM ventas ORDER BY fecha desc", function (err, resultados) {
        if (err) throw err;
        console.log(resultados);
        res.render('panelVentas', { documentos: resultados })
      });
      break;
    case 2:
      res.render('panelUsuario', { title: 'Panel' });
      break;
    default:
      res.redirect('/login');
  }


});

router.get('/panelClientes', function (req, res, next) {


  switch (req.session.usertype) {
    case 1:
      db.query("SELECT * FROM customers ORDER BY fecha desc", function (err, resultados) {
        if (err) throw err;
        console.log(resultados);
        res.render('panelClientes', { documentos: resultados })
      });
      break;
    case 2:
      res.render('panelUsuario', { title: 'Panel' });
      break;
    default:
      res.redirect('/login');
  }


});


//CRUD--------------------------------------------------------------------

router.get('/panelCreate', function (req, res, next) {
  switch (req.session.usertype) {
    case 1:
      res.render('panelCreate', { title: 'Crear' });
      break;
    case 2:
      res.render('panelUsuario', { title: 'Panel' });
      break;
    default:
      res.redirect('/login');
  }
});


router.post('/panelCreate', function (req, res, next) {

  if (!req.files) { return res.status(400).send("No hay archivo"); }
  let imagenASubir = req.files.imagen;
  let archivoASubir = req.files.archivo;
  imagenASubir.mv('public/imagesProductos/' + req.files.imagen.name, function (err, resultados) {
    if (err)
      return res.status(500).send(err);
  });

  archivoASubir.mv('public/archivosProductos/' + req.files.archivo.name, function (err, resultados) {
    if (err)
      return res.status(500).send(err);
  });

  var producto = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    imagen: req.files.imagen.name,
    autor: req.body.autor,
    tecnologia: req.body.tecnologia,
    precio: req.body.precio,
    existencia: req.body.stock,
    vendidos: 0,
    archivo: req.files.archivo.name
  }



  db.query("INSERT INTO productos SET ?", producto, function (err, resultados) {

    res.redirect('/panelProductos');

  });

});




router.get('/Notificaciones', function (req, res, next) {

  if (payment.payer.payment_method === 'paypal') {
    req.session.paymentId = payment.id;
    let redirectUrl;
    for (let i = 0; i < payment.links.length; i++) {
      let link = payment.links[i];
      if (link.method === 'REDIRECT') {
        redirectUrl = link.href;
      }
    }
  }

  res.render('panelNotificaciones', { title: 'Notificaciones' });

});




router.post('/panelEdit/:id/:imagen/:archivo/:vendidos', function (req, res, next) {
  //Variable a validad
  var img, arch;

  if (!req.files.imagen) {
    img = req.params.imagen;
  }
  else {
    let imagenASubir = req.files.imagen;

    let archivoASubir = req.files.archivo;
    imagenASubir.mv('public/imagesProductos/' + req.files.imagen.name, function (err, resultados) {
      if (err)
        return res.status(500).send(err);
    });

    img = req.files.imagen.name;
  }



  if (!req.files.archivo) {
    arch = req.params.archivo;
  }
  else {
    let archivoASubir = req.files.archivo;

    archivoASubir.mv('public/archivosProductos/' + req.files.archivo.name, function (err, resultados) {
      if (err)
        return res.status(500).send(err);
    });

    arch = req.files.archivo.name;
  }


  var producto = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    imagen: img,
    autor: req.body.autor,
    tecnologia: req.body.tecnologia,
    precio: req.body.precio,
    archivo: arch,
    existencia: req.body.stock,
    vendidos: req.params.vendidos
  }

  console.log(req.params.id);
  console.log(producto);
  //SQL para acceder a MySQL y devolver los datos de un arreglo
  db.query("UPDATE productos SET ? WHERE id = " + req.params.id + "", producto, function (err, resultados) {
    res.redirect('/panelProductos');
  });

});


router.get('/getData', function (req, res, next) {

  /*var purchaseID = req.query.tx;
  var atoken = MYAuthToken;
  var postDataArray = {'cmd':'_notify-synch','tx': purchaseID, 'at': atoken}
  var postData = JSON.stringify(postDataArray);
  console.log(postData);
  var options = {
      hostname: 'www.sandbox.paypal.com',
      port: 443,
      path: '/cgi-bin/webscr',
  method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': postData.length
          }
      };
  
      var req = https.request(options, function(res) {
          console.log('STATUS: '+ res.statusCode);
          console.log('HEADERS: '+ JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', function(chunk) {
              console.log('BODY: '+chunk);
          });
          res.on('end', function() {
              console.log('No more data in response.')
          });
      });
      req.on('error', function(e) {
          console.log('problem with request: '+e.message);
      });
      req.write(postData);
      req.end();
  });*/

  /**
* Created by chrissewell on 31/10/2016.
*/

  const request = require('request');

  exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    //Return 200 to caller
    callback(null, {
      statusCode: '200'
    });

    //Read the IPN message sent from PayPal and prepend 'cmd=_notify-validate'
    var body = 'cmd=_notify-validate&' + event.body;

    console.log('Verifying');
    console.log(body);

    var options = {
      url: 'https://www.sandbox.paypal.com/cgi-bin/webscr',
      method: 'POST',
      headers: {
        'Connection': 'close'
      },
      body: body,
      strictSSL: true,
      rejectUnauthorized: false,
      requestCert: true,
      agent: false
    };

    //POST IPN data back to PayPal to validate
    request(options, function callback(error, response, body) {
      if (!error && response.statusCode === 200) {

        //Inspect IPN validation result and act accordingly
        if (body.substring(0, 8) === 'VERIFIED') {

          //The IPN is verified
          console.log('Verified IPN!');
        } else if (body.substring(0, 7) === 'INVALID') {

          //The IPN invalid
          console.log('Invalid IPN!');
        } else {
          //Unexpected response body
          console.log('Unexpected response body!');
          console.log(body);
        }
      } else {
        //Unexpected response
        console.log('Unexpected response!');
        console.log(response);
      }

    });

  };


});

router.get('/ipn', function (req, res) {
  console.log('It works! ');
  res.status(200).send('OK');
  res.end();
});

//------------ PayPal

var cantidadTotal = 0;
var itemList = [];
var itemsComprados = "";

router.get('/pay/:carrito/:total', function (req, res) {

  db.query("SELECT productos.titulo as producto, productos.precio as precio, cart.ID as cart FROM productos INNER JOIN cartdetails ON productos.ID = cartdetails.producto INNER JOIN cart ON cart.ID = cartdetails.cart INNER JOIN user ON user.ID = cart.user WHERE cart = " + req.params.carrito + "", function (err, resultat) {
    if (err) throw err;


    //var itemList = [];

    for (var i = 0; i < resultat.length; i++) {
      itemList[i] = {
        "name": resultat[i].producto,
        "sku": resultat[i].producto,
        "price": resultat[i].precio,
        "currency": "MXN",
        "quantity": 1
      };

      itemsComprados += resultat[i].producto + " / ";

    };

    console.log('//ItemList');
    console.log(itemList);
    console.log('FinItemList');

    cantidadTotal = req.params.total;

    const create_payment_json = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "redirect_urls": {
        //"return_url": "https://electtroshop.herokuapp.com/successPage",
        //"cancel_url": "https://electtroshop.herokuapp.com/panelUsuario"
        "return_url": "http://localhost:3000/successPage",
        "cancel_url": "http://localhost:3000/panelUsuario"
      },
      "transactions": [{
        "item_list": {
          "items": itemList
        },
        "amount": {
          "currency": "MXN",
          "total": req.params.total
        },
        "description": "Manuales digitales de Programación"
      }]
    };




    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        //console.log("Create Payment Response");
        //console.log(payment);

        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            res.redirect(payment.links[i].href);



          }
        }
      }
    });

    
    console.log('//Crieit peyment');
    console.log(create_payment_json);
    console.log('Fin JOTASON');
  }); //Final db.query

  /**/
}); // FIN router carrito-pay


router.get('/successPage', function (req, res) {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  var execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "MXN",
        "total": cantidadTotal
      }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      console.log("Get Payment Response");
      console.log(JSON.stringify(payment));


      db.query("SELECT * FROM user WHERE ID = ?", req.session.userid, function (err, resultados) {
        if (err) throw err;
        if (resultados[0]) {

          var customer = {
            nombre: resultados[0].nombre,
            apellidos: resultados[0].apellidos,
            correo: resultados[0].email,
            fecha: moment(new Date()).tz('America/Mexico_City').format('YYYY-MM-DD HH:mm:ss')
          }

          var venta = {
            payerid: payerId,
            paymentid: paymentId,
            cliente: resultados[0].nombre,
            productos: itemsComprados,
            fecha: moment(new Date()).tz('America/Mexico_City').format('YYYY-MM-DD HH:mm:ss'),
            total: cantidadTotal
          }
    
          db.query("INSERT INTO ventas SET ?", venta, function (err, resistol) {
            console.log("Venta insertada");
    
          }); //Fin query insert

          db.query("INSERT INTO customers SET ?", customer, function (err, resistol) {
            if (err) throw err;
            console.log("Cliente insertado");

          }); //Fin query insert

          db.query("DELETE FROM cart WHERE user = ?", req.session.userid, function (err, resultados) {
            if (err) throw err;
            console.log('Carrito vaciado');
          });


        } //Fin IF

      }); //Fin query select

      //Descuento de stock


      for (var j = 0; j < itemList.length; j++) {

        db.query("SELECT * FROM productos WHERE titulo = '" + itemList[j].name + "'", function (err, resProd) {
          if (err) throw err;
          if (resProd[0]) {

            var stock = {
              existencia: resProd[0].existencia - 1,
              vendidos: resProd[0].vendidos + 1
            }



            db.query("UPDATE productos SET ? WHERE titulo = '" + resProd[0].titulo + "'", stock, function (err, ress) {
              console.log("Stock de: " + resProd[0].titulo + " actualizado.");
            });

            var descarga = {
              user: req.session.userid,
              producto: resProd[0].ID,
              fecha: moment(new Date()).tz('America/Mexico_City').format('YYYY-MM-DD HH:mm:ss')
            }

            db.query("INSERT INTO descargas SET ?", descarga, function (err, ress) {
              console.log("Descargas actualizadas.");
            });

          }
        });
      }

      ///////////


      res.render('successPage', { title: 'Gracias' });

    }
  });


}); //Fin success page

module.exports = router;
