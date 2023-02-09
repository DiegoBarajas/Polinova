const ctrl = {};
const Usuario = require('../models/usuarios.model');

/* --- --- --- --- --- --- ---  C R U D  --- --- --- --- --- --- --- */
//Crear Usuario
ctrl.crear = async(req, res)=>{
    const { 
            nombre,
            apellido, 
            id_empresa, 
            correo, 
            telefono, 
            contraseña, 
            dios, 
            admin, 
            moderador, 
            cotizaciones, 
            tickets 
        } = req.body;

    const newUsuario = new Usuario({
        nombre, 
        apellido, 
        id_empresa, 
        correo, 
        telefono, 
        contraseña, 
        dios,
        admin, 
        moderador, 
        cotizaciones, 
        tickets
    });

    var error = false;
    await newUsuario.save()
        .catch(err => {
            res.json(err);
            console.log("ERROR: "+err); 
            error = true;
        });

    if(!error){
        res.json(newUsuario);        
    }
}

//Obtener todos los Usuarios
ctrl.obtenerTodo = async(req, res)=>{
    const Usuarios = await Usuario.find();

    res.json(Usuarios);
}

//Obtener un usuario
ctrl.obtenerUno = async(req, res)=>{
    const id = req.params.id;

    var usuario = await Usuario.findById(id)
        .catch(err => {
            res.json(err);
            console.log("ERROR: "+err); 
        });
    
        if(usuario === null){
            res.json({message: 'No se encontro el registro'});
        }else{
            res.json(usuario);
        }
}

//Actualizar usuario
ctrl.actualizar = async(req, res)=>{
    const id = req.params.id;
    const { 
            nombre, 
            apellido, 
            id_empresa, 
            correo, 
            telefono, 
            contraseña, 
            dios, 
            admin, 
            moderador, 
            cotizaciones, 
            tickets 
        } = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, {
        nombre, 
        apellido, 
        id_empresa, 
        correo, 
        telefono, 
        contraseña, 
        dios, 
        admin, 
        moderador, 
        cotizaciones, 
        tickets
    }).catch(err=>{
        res.json(err);
        console.log("ERROR: "+err); 
    });

    if(usuario === null){
        res.json({message: 'No se encontro el registro'});
    }else{
        res.json(usuario);
    }
}

//Eliminar usuario
ctrl.eliminar = async(req, res)=>{
    const id = req.params.id;

    const usuario = await Usuario.findByIdAndDelete(id)
        .catch(err=>{
            res.json(err);
            console.log("ERROR: "+err); 
        });

    if(usuario === null){
        res.json({message: 'No se encontro el registro'});
    }else{
        res.json(usuario);
    }
}

module.exports = ctrl;