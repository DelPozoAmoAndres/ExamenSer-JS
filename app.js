const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
var swig = require('swig'); //hay que meterlo con app y gestorbd en las rutas
const https = require('https');
const logger = require('morgan');
var bodyParser = require('body-parser');

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Log requests to the console.
app.use(logger('dev'));

//css files
app.use(express.static(__dirname + '/public'));

//Configurar base de datos
var Db = null;
//Rutas/controladores por lógica
require("./routes/home")(app, swig, Db);  // (app, param1, param2, etc.)

//Controlador en caso de 404
app.get('*', function (req, res, next) {
    console.log("Error producido: ");
    res.send({ Error: { status: 404, data: "No se ha encontrado la pagina" } })

})