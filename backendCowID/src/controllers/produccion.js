import { connect } from '../database';

export const getProducciones = async (req, res) => {
    const db = await connect();
    
    const [rows] = await db.query("SELECT * FROM ProduccionDiaria");

    console.log([rows]);
    res.json([rows]);
}

export const getProduccion = async (req, res) => {
    const db = await connect();

    const [rows] = await db.query("SELECT * FROM ProduccionDiaria WHERE id = ?", [req.params.id]);

    console.log(rows[0]);
    res.json(rows[0]);
}

export const getLastProduccion = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM producciondiaria ORDER BY id DESC limit 1");

    res.json(rows[0]);
}

export const getProduccionesCount = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query("SELECT COUNT(*) FROM ProduccionDiaria");

    console.log("Producciones Count:");
    console.log(rows[0]["COUNT(*)"]);
    res.json(rows[0]["COUNT(*)"]);
}

export const createProduccion = async (req, res) => {
    const db = await connect();
    const [results] = await db.query("INSERT INTO ProduccionDiaria(VacaID, Fecha, CantidadManana, CantidadTarde)"+
    "VALUES (? ,?, ?, ?) ",
         [req.body.VacaID, req.body.Fecha, req.body.CantidadManana, req.body.CantidadTarde]);

    console.log({
        id : results.insertId,
        ...req.body
        });

        /*El "..." selecciona todo lo del req.body */

    res.json({
        id : results.insertId,
        ...req.body
        });
}

export const deleteProduccion = async (req, res) => {
    const db = await connect();
    const result = await db.query("DELETE FROM ProduccionDiaria WHERE id = ?", [req.params.id]);

    console.log(result);
    //res.json({});
    res.sendStatus(204);
}

export const updateProduccion = async (req, res) => {
    const db = await connect();

    const results = await db.query('UPDATE ProduccionDiaria SET ? WHERE id = ?',[
        req.body,
        req.params.id
    ])
    console.log(results);
    res.sendStatus(204);
}