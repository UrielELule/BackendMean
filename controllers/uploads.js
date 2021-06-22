const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require("../helpers/update-image");
const fs = require('fs');

const path = require('path'); //ya viene en node
const { PerformanceNodeTiming } = require("perf_hooks");



const fileUpload = (req, resp = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    //aseguramos la collecion a agregar imagenes VALIDAR TIPO
    const tiposPermitidos = ['hospitales', 'medicos', 'usuarios'];

    if( !tiposPermitidos.includes(tipo) ) {
        return resp.status(400).json({
            ok: false,
            msg: 'El tipo seleccionado es desconocido'
        }); 
    }
    //validamos que exita un archivo que subir 
    if (!req.files || Object.keys(req.files).length === 0) {
        return resp.status(400).json({
          ok: false,
          msg: 'No hay imagen que subir'  
        });
      }
      ///procesar la imagen
      const file = req.files.imagen;

      ///extraer la extencion del archivo
      const nombreCortado = file.name.split('.');
      const extensionArchivo = nombreCortado[nombreCortado.length - 1];

      //validar extension

      const extensionesValida = ['png','jpg','jpeg','gif'];
      
      if(!extensionesValida.includes( extensionArchivo ) ) {
        return resp.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        }); 
      }

      ///generar el nombre del archivo
      const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

      //path  para guardar la imagen
      const path = `./uploads/${tipo}/${nombreArchivo}`;

      //guardar o mover la imagen
      file.mv(path, (err) => {
        if (err) {
            console.log(err)
            return resp.status(500).json({
                ok: false,
                msg: 'Erro al guardar la imagen'
            });
        }

        //actualizar base de datos
        updateImage( tipo, id, nombreArchivo );

        resp.json({
            ok: true,
            msg: 'Archivo Subido',
            nombreArchivo
        });

      });
     
}

const retornoImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` ); //si existe

    //imagen por defecto
    if( fs.existsSync( pathImg ) ) { //preguntamos si existe
        res.sendFile(pathImg); //lo enviamos si existe
    } else {
        const pathImg = path.join(__dirname, `../uploads/noimg.jpg`);
        res.sendFile( pathImg );
      
    }
    //decirmos que responda al archivo
    
}

module.exports = {
    fileUpload,
    retornoImagen
}