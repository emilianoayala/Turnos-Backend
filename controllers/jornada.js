const { response } = require("express");
const Jornada = require("../models/Jornada");
const TipoJornada = require("../models/TipoJornada");
const moment = require ('moment');


const newJornada = async (req, res) => {

    const { tipoJornada, fechaInicio, fechaFin, uid } = req.body;
    try {
        //Verifico que exista el tipo de jornada
        let tipo = await TipoJornada.findOne({ tipoJornada });
      
        console.log("pase por aca2")
        if (!tipo) {
            return res.status(400).json({
                ok: false,
                msg: 'El tipo de jornada no existe'
            })
        }


        let isValid = await validarLimiteSemanal(uid, fechaInicio);
        if(!isValid)
        {
            return res.status(400).json({
                ok:false,
                msg: 'No se puede trabajar mas de 48hs semanales'
            });
        }


        //Valido que no haya mas de dos empleados en el turno.
        isValid =  await validarLimiteEmpleados(fechaInicio);    
        if(!isValid)
        {
            return res.status(400).json({
                ok:false,
                msg: 'No puede haber mas de dos empleados en la jornada.'
            });
        }

        if(tipo.tipoJornada === 'Día Libre'){
            
            isValid =  await validarDiaLibre(uid, fechaInicio);    
            if(!isValid)
            {
                return res.status(400).json({
                    ok:false,
                    msg: 'No puede cargar horas en su dia libre.'
                });
            }

            isValid =  await validarDiasLibresMes(uid, fechaInicio, fechaFin);    
            if(!isValid)
            {
                return res.status(400).json({
                    ok:false,
                    msg: 'No puede tener mas de dos dias libres al mes.'
                });
            }
        }


        let tipoId = tipo._id;
        //Creo la jornada
        let jornada = new Jornada({ tipoJornada: tipoId, fechaInicio, fechaFin, usuario: uid })

        //Grabo en BD
        await jornada.save(),
            res.status(201).json({
                ok: true,
                jornada
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: error
        })
    }
}

const validarLimiteEmpleados = async (fechaInicio) => {

    const inicioJornada = moment(fechaInicio).startOf('day');//Obtengo el inicio de la jornada
    const finJornada = moment(fechaInicio).endOf('day'); //Obtengo el fin de la jornada.

    //obtengo las jornadas de hoy
    let jornadasCargadas =  await Jornada.find(
    {        
        fechaInicio: {
            $gte: inicioJornada.toDate(),
            $lte: finJornada.toDate()
        }
    }); 
  
    //SI hay mas de dos empleados asignados a la jornada de hoy retorno false
    if(jornadasCargadas.length > 2) 
        return false;   
    else
        return true; 
}

const validarDiaLibre = async (uid, fechaInicio) => {

    const inicioJornada = moment(fechaInicio).startOf('day');//Obtengo el inicio de la jornada
    const finJornada = moment(fechaInicio).endOf('day'); //Obtengo el fin de la jornada.  

    const tipo = await TipoJornada.findOne({
        tipoJornada:'Día Libre'
    })

    //obtengo los dias libres cargados por el usuario
    let jornadasCargadas =  await Jornada.find(
    {  
        tipoJornada:  tipo._id,    
        usuario: uid,
        fechaInicio: {
            $gte: inicioJornada.toDate(),
            $lte: finJornada.toDate()
        }
    }); 

    //Si el empleado tiene el dia libre no puede cargar
    if(jornadasCargadas.length > 0)
        return false; 
    else
        return true;
}

const validarDiasLibresMes = async (uid, fechaInicio, fechaFin) => {

    const inicioMes = moment(fechaInicio).startOf('month');//Obtengo el inicio del mes
    const finMes = moment(fechaFin).endOf('month'); //Obtengo el fin del mes

    const tipo = await TipoJornada.findOne({
        tipoJornada:'Día Libre'
    })

    //obtengo los dias libres cargados por el usuario
    let jornadasCargadas =  await Jornada.find(
    {  
        tipoJornada:  tipo._id,    
        usuario: uid,
        fechaInicio: {
            $gte: inicioMes.toDate(),
            $lte: finMes.toDate()
        }
    }); 

    //Si el empleado tiene mas de dos dias libres no puede cargar otro
    if(jornadasCargadas.length > 2)
        return false; 
    else
        return true;
}

const validarLimiteSemanal = async (uid, fechaInicio) => {

    const inicioSemana = moment(fechaInicio).startOf('week');   
    let hsCargadas = 0;    
    //obtengo las jornadas semanales
    let jornadasCargadas =  await Jornada.find(
    {
        usuario: uid, 
        fechaInicio: {
            $gte: inicioSemana.toDate(), 
            $lt: fechaInicio.toDate()
        } 
    }); 

    //Recorro las jornadas semanales
    for (let i = 0; i < jornadasCargadas.length; i++) {
        //Obtengo los milisegundos de diferencia
        hsCargadas = hsCargadas + (new Date(jornadasCargadas[i].fechaFin) - 
                                   new Date(jornadasCargadas[i].fechaInicio))
    }  
   
    //Obtengo las hs
    hsCargadas = Math.round(hsCargadas/(1000 * 60 * 60));  
    if(hsCargadas > 48)//SI supera el limite semanal retorno false
        return false;    
    else
        return true;    
}



module.exports = {
    newJornada

}