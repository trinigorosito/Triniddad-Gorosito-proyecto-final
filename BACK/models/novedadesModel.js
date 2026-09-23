const { get } = require('../routes');
var pool = require('./bd')

async function  getNovedades(params) {
    var query = 'select * from novedades'
    var rows = await pool.query(query);
    return rows;
}

async function insertNovedad(obj) {
    try{
        var query = "insert into novedades set ?";
        var rows = await pool.query(query,[obj])
        return rows;
    } catch (error){
        console.log(error);
        throw error;
    }
    
}

async function deleteNovedadById(id) {
    var query = "delete from novedades where idNovedades = ?";
    const rows = await pool.query(query, [id]);
    return rows;
}

async function getNovedadById(id) {
    var query = "select * from novedades where idNovedades = ?";
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function updateNovedadById(obj, id) {
    try {
        var query = "update novedades set ? where idNovedades = ?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


module.exports = {getNovedades,insertNovedad, deleteNovedadById, getNovedadById, updateNovedadById}