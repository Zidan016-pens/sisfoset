const mysql = require('mysql2/promise')
const shortid = require('shortid')
const hash = require('bcrypt')

const koneksiDB = async () => {
    return await mysql.createConnection(
        {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '',
            database:'sisfoset'
        }
    )
}

const addLevel = async (nama, idBuat, idUpdate) =>{
    const db = await koneksiDB();
    const id = shortid.generate();
    const sql = `INSERT INTO level VALUES('${id}' ,"${nama}", NOW(), NOW(), '${idBuat}' , '${idUpdate}')`;
    try {
        await db.execute(sql)
        return 200;
    } catch (e) {
        console.log(`ada Error  : ${e}`)
        return 400;
    }
}

const updateLevel = async (id, nama, idUpdate) => {
    const db = await koneksiDB();
    const sql = `UPDATE level SET nama = "${nama}", tanggalUpdate = NOW(), idUpdate = '${idUpdate}' WHERE idLevel = '${id}'`;
    try {
        await db.execute(sql);
        return 200;
    } catch (e) {
        console.log(`ada Error : ${e}`);
        return 400;
    }
};

const getAllLevel = async()=>{
    const db = await koneksiDB();
    const sql = `SELECT * FROM level`
    try {
        const [rows] = await db.execute(sql)
        return rows.length > 0 ? rows: false;
    } catch (e) {
        console.log(`ada Error  : ${e.messsage}`)
        return 400;
    }
}

const addAkses = async (nama, username, password, status, idLevel, idBuat, idUpdate )=>{
    const db = await koneksiDB();
    const id  = shortid.generate();
    const salt = await hash.genSalt(10);
    const newPass = await hash.hash(password, salt)
    const sql = `INSERT INTO akses VALUES('${id}', '${nama}', '${username}', '${newPass}', '${status}', '${idLevel}', NOW(), NOW(), '${idBuat}', '${idUpdate}')`
    try {
        await db.execute(sql)
        return 200;
    } catch (e) {
        console.log(`ada Error  : ${e}`)
        return 400;
    }
}

const updateAkses = async (idAkses, nama, username, password, status, idLevel, idBuat, idUpdate) =>{
    const db = await koneksiDB();
    const sql = `UPDATE akses SET nama ='${nama}',username ='${username}', password='${password}', status ='${status}', idLevel ='${idLevel}', tglUpdate = NOW(),idBuat ='${idBuat}', idUpdate='${idUpdate}' WHERE idAkses = '${idAkses}' `
    try {
        await db.execute(sql)
        return 200;
    } catch (e) {
        console.log(`ada Error  : ${e}`)
        return 400;
    }
}

const getAksesByNama = async (nama)=>{
    const db = await koneksiDB();
    const sql =  `SELECT * FROM akses WHERE nama = '${nama}'`
    try {
        const [rows] = await db.execute(sql)
        return rows.length > 0 ? rows : false  
    } catch (error) {
        console.log(`ada Error  : ${e.messsage}`)
        return 400;
    }
}

const getAllAkses = async () =>{
    const db = await koneksiDB();
    const sql =  `SELECT * FROM akses`
    try {
        const [rows] = await db.execute(sql)
        return rows.length > 0 ? rows : false  
    } catch (error) {
        console.log(`ada Error  : ${e.messsage}`)
        return 400;
    }
}

module.exports = {koneksiDB, addLevel, updateLevel, getAllLevel, addAkses, updateAkses, getAksesByNama, getAllAkses}