var express = require('express');
var router = express.Router();
var obrasModel = require('../../models/obrasModel');

router.get('/', async function (req, res, next) {
    try {
        let obras = await obrasModel.getObras();

        res.render('admin/obras/obras', {
            layout: 'admin/layout',
            usuario: req.session.nombre,
            obras
        });
    } catch (error) {
        console.error('Error al cargar obras:', error);
        res.render('admin/obras/obras', {
            layout: 'admin/layout',
            usuario: req.session.nombre,
            error: true,
            message: 'No se pudieron cargar las obras'
        });
    }
});

router.get('/agregar', (req, res, next) => {
    res.render('admin/obras/agregar', {
        layout: 'admin/layout',
        usuario: req.session.nombre
    });
});

router.post('/agregar', async (req, res, next) => {
    try {
        const { titulo, teatro, genero, sinopsis } = req.body;

        if (titulo && teatro && genero && sinopsis) {
            await obrasModel.insertObra({
                titulo,
                teatro,
                genero,
                sinopsis
            });
            res.redirect('/admin/obras');
        } else {
            res.render('admin/obras/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son obligatorios'
            });
        }
    } catch (error) {
        console.error('Error al insertar obra:', error);
        res.render('admin/obras/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'Error al intentar guardar la obra'
        });
    }
});

router.get('/eliminar/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await obrasModel.deleteObraById(id);
        res.redirect('/admin/obras');
    } catch (error) {
        console.error('Error al eliminar obra:', error);
        res.redirect('/admin/obras');
    }
});

router.get('/modificar/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        let obra = await obrasModel.getObraById(id);

        res.render('admin/obras/modificar', {
            layout: 'admin/layout',
            usuario: req.session.nombre,
            obra
        });
    } catch (error) {
        console.error('Error al obtener obra:', error);
        res.redirect('/admin/obras');
    }
});

router.post('/modificar', async (req, res, next) => {
    try {
        const { idObra, titulo, teatro, genero, sinopsis } = req.body;

        const obj = {
            titulo,
            teatro,
            genero,
            sinopsis
        };

        await obrasModel.updateObraById(obj, idObra);
        res.redirect('/admin/obras');
    } catch (error) {
        console.error('Error al modificar obra:', error);
        res.render('admin/obras/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se pudo modificar la obra'
        });
    }
});

module.exports = router;