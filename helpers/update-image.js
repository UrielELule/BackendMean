const Usuario = require('../models/usuario');
const Medicos = require('../models/medico');
const Hospitales = require('../models/hospital');
const fs = require('fs');

const borrarImagen = (path) => {
     //verificamos si existe
     if( fs.existsSync(path) ) {
         //si existe borramos la imagen anterior
         fs.unlinkSync(path);
     }
}


const updateImage = async( tipo, id, nombreArchivo ) => {

    let pathViejo = '';

    //evaluamos el tipo para las collecciones
    switch(tipo) {

        case 'medicos':
              //verificar si existe medico por ese id
              const medico = await Medicos.findById(id);
              //si no existe
              if(!medico) {
                  console.log('No es un medico');
                  return false;
              }

              //si es un medico evaluamos si tiene img asignada 
              pathViejo = `./uploads/medicos/${medico.img}`;
              borrarImagen(pathViejo);
             
              //lo guardamos
              medico.img = nombreArchivo;
              await medico.save();
              return true;

        break;

        case 'hospitales':

            const hospital = await Hospitales.findById(id);
            if(!hospital) {
                console.log('No es un hospital');
                return false;
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

        break;

        case 'usuarios':

            const usuario = await Usuario.findById(id);

            if(!usuario) {
                console.log('No es un usuario');
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

        break;
    }
    
}


module. exports = {
    updateImage
}