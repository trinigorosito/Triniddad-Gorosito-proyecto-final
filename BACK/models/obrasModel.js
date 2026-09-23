var pool = require('./bd');

async function getObras() {
    var query = 'SELECT * FROM obra ORDER BY idObra DESC';
    var rows = await pool.query(query);
    return rows;
}

async function insertObra(obj) {
    try {
        var query = 'INSERT INTO obra SET ?';
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.error('Error al insertar en DB:', error);
        throw error;
    }
}

async function deleteObraById(id) {
    var query = 'DELETE FROM obra WHERE idObra = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

async function getObraById(id) {
    var query = 'SELECT * FROM obra WHERE idObra = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function updateObraById(obj, id) {
    try {
        var query = 'UPDATE obra SET ? WHERE idObra = ?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        console.error('Error al actualizar en DB:', error);
        throw error;
    }
}

module.exports = {
    getObras,
    insertObra,
    deleteObraById,
    getObraById,
    updateObraById
};