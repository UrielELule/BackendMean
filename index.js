const express = require('express'); 
require('dotenv').config();
const cors = require('cors')
const { dbConnection } = require('./database/config');


//crear servidor de express
const app = express();

///configuracion de CORS
app.use(cors());

//Lectura y  parseo del body extraer lo que se envia
app.use( express.json() );

//Base de datos
dbConnection();

//variables entorno
//console.log(process.env);

//rutas pregunta y respuesta  y controlador
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require('./routes/auth') );
/*

*/

//levantar el puerto donde se ejecutara el servidor
app.listen(process.env.PORT, () => {
    console.log('Server Corriendo en puerto' + process.env.PORT);
});