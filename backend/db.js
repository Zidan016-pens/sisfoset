const mysql = require('mysql2/promise')
const shortid = require('shortid')
const hash = require('bcrypt')
const crypto = require('crypto');

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
    const id = `LVL${crypto.randomBytes(1).toString('hex')}`
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

const delLevel = async (id)=>{
    const db = await koneksiDB();
    const query = `DELETE FROM level WHERE idLevel = '${id}'`
    try {
        await db.execute(query)
        return 200
    } catch (e) {
        console.log(`ada error : ${e}`)
    }
}

const addAkses = async (nama, username, password, status, idLevel, idBuat, idUpdate )=>{
    const db = await koneksiDB();
    const id  = `USR${crypto.randomBytes(5).toString('hex')}`
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
    const sql =  `SELECT * FROM akses WHERE username = '${nama}'`
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

const delAkses = async (id) =>{
    const db = await koneksiDB()
    const sql = `DELETE FROM akses WHERE idAkses = '${id}'`
    try {
        await db.execute(sql)
        return 200
    } catch (e) {
        console.log(`ada error : ${e}`)
        return 400;
    }
}

const getAllKategori = async()=>{
    const db = await koneksiDB();
    const sql = `SELECT * FROM kategori`
    try {
        const [rows] = await db.execute(sql)
        return rows.length> 0 ? rows : false
    } catch (e) {
        console.log(`ada Error  : ${e}`)
        return 400;
    }
}

const getKategoriId = async (id)=>{
    const db = await koneksiDB();
    const sql = `SELECT * FROM kategori WHERE idKategori = '${id}';`
    try {
        const [rows] = await db.execute(sql)
        return rows.length > 0 ? rows : false
    } catch (e) {
        console.log(`ada Error  : ${e}`)
        return 400;
    }
}

const addKategori = async(nama, idUser)=>{
    const db = await koneksiDB();
    const id = `KAT${crypto.randomBytes(1).toString('hex')}`;
    const sql = `INSERT INTO kategori VALUES('${id}', '${nama}', NOW(), NOW(), '${idUser}', '${idUser}')`
    try {
        await db.execute(sql)
        return 200;
    } catch (e) {
        console.log(`ada Error  : ${e}`)
        return 400;
    }
}

const updateKategori = async (id, nama, idUser)=>{
    const db = await koneksiDB();
    const sql = `UPDATE kategori set nama = '${nama}', idUpdate = '${idUser}', tglUpdate = NOW() where idKategori = '${id}'`
    try {
        await db.execute(sql)
        return 200;
    } catch (e) {
        console.log(`ada Error  : ${e}`)
        return 400;
    }
}

const delKategori = async (id) =>{
    const db = await koneksiDB()
    const sql = `DELETE FROM kategori WHERE idKategori = '${id}'`
    try {
        await db.execute(sql)
        return 200
    } catch (e) {
        console.log(`ada error : ${e}`)
        return 400;
    }
}

const getAllMerk = async ()=>{
    const db = await koneksiDB();
    const sql = `SELECT * FROM merk`
    try {
        const [rows] = await db.execute(sql)
        return rows.length > 0 ? rows : []
    } catch (e) {
        console.log(`ada Error  : ${e}`)
        return [];
    }
}

const getMerkId = async(id)=>{
    const db = await koneksiDB();
    const sql = `SELECT * FORM merk where idMerk = '${id}'`
    try {
        const [rows] = await db.execute(sql)
        return rows.length > 0 ? rows : false
    } catch (e) {
        console.log(`ada Error  : ${e}`)
        return 400;
    }
}

const addMerk = async (nama, idUser)=>{
    const db = await koneksiDB();
    const id = `MRK${crypto.randomBytes(1).toString('hex')}`;
    const sql = `INSERT INTO merk VALUES('${id}','${nama}', NOW(), NOW(), '${idUser}', '${idUser}')`
    try {
        await db.execute(sql);
        return 200;
    } catch (e) {
        console.log(`ada Error  : ${e}`)
        return 400;
    }
}

const updateMerk = async (nama, idUser, id) =>{
    const db = await koneksiDB();
    const sql = `UPDATE merk SET nama = '${nama}', idUpdate = '${idUser}', tglUpdate = NOW() where idMerk = '${id}'`
    try {
        await db.execute(sql)
        return 200;
    } catch (e) {
        console.log(`ada Error  : ${e}`)
        return 400;
    }
}

const delMerk = async (id) =>{
    const db = await koneksiDB()
    const sql = `DELETE FROM merk WHERE idMerk = '${id}'`
    try {
        await db.execute(sql)
        return 200
    } catch (e) {
        console.log(`ada error : ${e}`)
        return 400;
    }
}

const getAllMasset = async () =>{
    const db = await koneksiDB()
    const sql = `SELECT * FROM masteraset`
    try {
        const [data] = await db.execute(sql)
        return data.length > 0 ? data : []
    } catch (e) {
        console.log(`ada error : ${e}`)
        return [];
    }
}

const getMassetId = async (id) =>{
    const db = await koneksiDB()
    const sql = `SELECT * FROM masteraset WHERE idMasteraset = '${id}'`
    try {
        const [data] = await db.execute(sql)
        return data.length > 0 ? data : false
    } catch (e) {
        console.log(`ada error : ${e}`)
        return 400;
    }
}

const getMassetIdMerk = async (id) =>{
    const db = await koneksiDB()
    const sql = `SELECT * FROM masteraset WHERE idMerek = '${id}'`
    try {
        const [data] = await db.execute(sql)
        return data.length > 0 ? data : false
    } catch (e) {
        console.log(`ada error : ${e}`)
        return 400;
    }
}

const getMassetIdKategori = async (id)=>{
    const db = await koneksiDB()
    const sql = `SELECT * FROM masteraset WHERE idKategori = '${id}'`
    try {
        const [data] = await db.execute(sql)
        return data.length > 0 ? data : false
    } catch (e) {
        console.log(`ada error : ${e}`)
        return 400;
    }
}

const addMasset = async (tipe, spesifikasi, deskripsi, idKategori, idMerk, idUser) =>{
    const id = `AST${crypto.randomBytes(3).toString('hex')}`
    const db = await koneksiDB()
    const sql = `INSERT INTO masteraset VALUES ('${id}', '${tipe}', '${spesifikasi}', '${deskripsi}', '${idKategori}', '${idMerk}', NOW(), NOW(), '${idUser}', '${idUser}')`
    try {
        await db.execute(sql)
        return 200
    } catch (e) {
        console.log(`ada error : ${e}`)
        return 400;
    }
}

const updateMasset = async (id, tipe, spesifikasi, deskripsi, idKategori, idMerk, idUser) =>{
    const db = await koneksiDB()
    const sql = `UPDATE masteraset tipe = ${tipe}, spesifikasi = ${spesifikasi}, deskripsi = ${deskripsi}, idKategori = ${idKategori}, idMerk = ${idMerk}, tglUpdate = NOW(), idUpdate = '${idUser}' WHERE idMasteraset = ${id}`
    try {
        await db.execute(sql)
        return 200
    } catch (e) {
        console.log(`ada error : ${e}`)
        return 400
    }
}

const delMasset = async(id)=>{
    const db = await koneksiDB()
    const sql = `DELETE FROM masteraset WHERE idMasteraset = '${id}'`
    try {
        await db.execute(sql)
        return 200;
    } catch (e) {
        console.log(`ada error : ${e}`)
        return 400;
    }
}

const addUnit = async (nama, idUser)=>{
    const db = await koneksiDB()
    const id = `UNT${crypto.randomBytes(3).toString('hex')}`
    const sql = `INSERT INTO unit VALUES('${id}', '${nama}', NOW(), NOW(), '${idUser}', ${idUser})`
    try {
        await db.execute(sql)
        return 200;
    } catch (e) {
        console.log(`ada error : ${e}`)
        return 400;
    }
}

const getAllUnit = async ()=>{
    const db = await koneksiDB()
    const sql = `SELECT * FROM unit`
    try {
        const [data] = await db.execute(sql)
        return data.length > 0 ? data : []
    } catch (e) {
        console.log(`ada error : ${e}`)
        return 400;
    }
}

const getUnitById = async (id)=>{
    const db = await koneksiDB()
    const sql = `SELECT FROM unit WHERE idUnit = '${id}'`
    try {
        const data = await db.execute(sql)
        return data.length > 0 ? data : false
    } catch (e) {
        console.log(`ada error : ${e}`)
        return 400;
    }
}

const updateUnit = async (id, nama, idUser)=>{
    const db = await koneksiDB()
    const sql = `UPDATE unit SET nama = '${nama}', tglUpdate = NOW(), idUpdate = '${idUser}' WHERE idUnit = '${id}'`
    try {
        await db.execute(sql)
        return 200;
    } catch (e) {
        console.log(`ada error : ${e}`)
        return 400;
    }
}

const deleteUnit = async (id)=>{
    const db = await koneksiDB()
    const sql = `DELETE FROM unit WHERE idUnit  = '${id}'`
    try {
        await db.execute(sql)
        return 200;
    } catch (e) {
        console.log(`ada error : ${e}`)
        return 400;
    }
}


module.exports = {koneksiDB, addLevel, updateLevel, getAllLevel, addAkses, updateAkses, getAksesByNama, getAllAkses, getAllKategori, getKategoriId, addKategori, updateKategori, getAllMerk, getMerkId, addMerk, updateMerk, delAkses, delKategori, delLevel, addMerk, getAllMasset, getMassetIdMerk, getMassetIdKategori, addMasset, updateMasset, delMasset, getMassetId, delMerk, getAllUnit, getUnitById, addUnit, deleteUnit, updateUnit} 