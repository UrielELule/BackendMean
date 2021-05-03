const express = require('express'); 
require('dotenv').config();
const cors = require('cors')
const { dbConnection } = require('./database/config');


//crear servidor de express
const app = express();

///configuracion de CORS
app.use(cors());

//Base de datos
dbConnection();

//variables entorno
//console.log(process.env);

//levantar el puerto donde se ejecutara el servidor
app.listen(process.env.PORT, () => {
    console.log('Server Corriendo en puerto' + process.env.PORT);
});


//rutas pregunta y respuesta
app.get( '/', (req, resp) => {
    resp.json({
        ok: true,
        msj: 'Server en linea'
    })
}); 

