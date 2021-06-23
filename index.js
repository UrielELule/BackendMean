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

//DIRECTORIO PUBLICO
app.use( express.static('public') );

//rutas pregunta y respuesta  y controlador
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medico') );
app.use( '/api/todo', require('./routes/busquedas') );
app.use( '/api/uploads', require('./routes/uploads') );
/*

*/

//levantar el puerto donde se ejecutara el servidor
app.listen(process.env.PORT, () => {
    console.log('Server Corriendo en puerto' + process.env.PORT);
});