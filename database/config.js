//imports
const mongoose = require('mongoose');

//funcion para hacer la conexion
const dbConnection = async () => {

    try{
        //espera a que se conecte ala base de datos
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false//agregado para que no de error al hacer update
        });
        //mensaje de succesfull
        console.log('BD Online');
        //si pasa algo con la db manda mensaje
    } catch (error) {
        console.log(error);
        throw new Error('Upss algo paso al iniciar la db');
    }

}

//exports
module.exports = {
    dbConnection
}