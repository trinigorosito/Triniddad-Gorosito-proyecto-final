var express = require('express');
var router = express.Router();

var novedadesModel = require('../../models/novedadesModel');
router.get('/', async function (req, res, next) {
    var novedades= await novedadesModel.getNovedades()
    
    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades
    });
});

router.get('/agregar', (req,res,next)=>{
    res.render('admin/agregar',{
       layout:'admin/layout' 
    })
})

router.post('/agregar', async(req, res, next) => {
    try{
        if(req.body.titulo!= "" && req.body.subtitulo != "" && req.body.cuerpo !=""){
            await novedadesModel.insertNovedad(req.body);
            res.redirect('/admin/novedades')
        } else{
            res.render('/admin/agregar',{
                layout: 'admin/novedades',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch (error){
        console.log(error)
        res.render('admin/agregar',{
        layout: 'admin/layout',
        error: true,
        message:'No se cargo la novedad'
        })
    }
})
router.get('/eliminar/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await novedadesModel.deleteNovedadById(id);
        res.redirect('/admin/novedades');
    } catch (error) {
        console.error('Error al eliminar novedad:', error);
        res.redirect('/admin/novedades');
    }
});

router.get('/modificar/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const novedad = await novedadesModel.getNovedadById(id);

        res.render('admin/modificar', {
            layout: 'admin/layout',
            novedad
        });
    } catch (error) {
        console.error(error);
        res.redirect('/admin/novedades');
    }
});

router.post('/modificar', async (req, res, next) => {
    try {
        const obj = {
            titulo: req.body.titulo,
            genero: req.body.genero,
            teatro: req.body.teatro
        };

        await novedadesModel.updateNovedadById(obj, req.body.idNovedades);
        res.redirect('/admin/novedades');
    } catch (error) {
        console.error(error);
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se pudo modificar la novedad'
        });
    }
});
module.exports = router;