import { connect } from '../database';

export const getVacas = async (req, res) => {
    const db = await connect();
    
    const [rows] = await db.query("SELECT * FROM Vaca");

    console.log([rows]);
    res.json([rows]);
}

export const getVaca = async (req, res) => {
    const db = await connect();

    const [rows] = await db.query("SELECT * FROM Vaca WHERE id = ?", [req.params.id]);

    console.log(rows[0]);
    res.json(rows[0]);
}

export const getVacasCount = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query("SELECT COUNT(*) FROM Vaca");

    console.log("Vacas Count:");
    console.log(rows[0]["COUNT(*)"]);
    res.json(rows[0]["COUNT(*)"]);
}

export const createVaca = async (req, res) => {
    const db = await connect();
    const [results] = await db.query("INSERT INTO Vaca(Peso, FechaNacimiento, NumeroPartos, QR,"+ 
        "ParcelaUbicacion, EdadDestete, AptaParaProduccion) VALUES (?,?, ?, ?, ?, ?, ?) ",
         [req.body.peso, req.body.fechaNacimiento, req.body.numeroPartos, req.body.qr,
         req.body.parcelaUbicacion, req.body.edadDestete, req.body.aptaParaProduccion]);

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

export const deleteVaca = async (req, res) => {
    const db = await connect();
    const result = await db.query("DELETE FROM Vaca WHERE id = ?", [req.params.id]);

    console.log(result);
    //res.json({});
    res.sendStatus(204);
}

export const updateVaca = async (req, res) => {
    const db = await connect();

    const results = await db.query('UPDATE Vaca SET ? WHERE id = ?',[
        req.body,
        req.params.id
    ])
    console.log(results);
    res.sendStatus(204);
}