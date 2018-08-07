var mysql = require('mysql');
/*port = process.env.PORT || 4205;
//port = 4205;
 
if (port === 4205) {
    var connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'proyectonode',
        insecureAuth: true
    });
} else {console.log("No hay conexión");}
*/

//Conexion local
var connection = mysql.createPool(
    {
        host:'db4free.net',
        port:3306,
        user:'electtroadm',
        password:'electtro2018',
        database:'electtro',
        insecureAuth:true
    }
);

//connection.connect();*/


/*var connection = mysql.createPool({
    host: 'mysql5014.site4now.net',
    user: 'a3d926_pnode',
    password: 'vegetto1',
    database: 'db_a3d926_pnode',
    insecureAuth: true
});*/

/*var connection = mysql.createPool({
    host: 'den1.mysql6.gear.host',
    user: 'proyectweb',
    password: 'Hz52vI-!H14Q',
    database: 'proyectweb',
    insecureAuth: true
});*/

//connection.connect();

module.exports = connection;