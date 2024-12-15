const db = require('./backend/db');
const express = require("express");
const { initDB } = require('./backend/initilizing');
const app = express();
const session = require('express-session')
const idAdmin = "LyPiw";
const bcrypt = require('bcrypt')

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(session({ 
    secret: 'rahasia super', 
    resave: false, 
    saveUninitialized: true, 
    cookie: { 
        secure: false 
    }}
));
app.use((req, res, next) => {
     if (!req.session.role) {
        req.session.role = 'guest'; 
    }
    next();
})

function checkRole(role) { 
    return function (req, res, next) { 
        if (req.session.role && req.session.role === role) {
             next(); 
        } else { 
            res.status(403).send('Akses ditolak: Anda tidak memiliki izin yang cukup'); 
        } 
    };
}

app.get("/", async (req, res)=>{
    res.render("index", {namafile : "login"})
})

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const rows = await db.getAksesByNama(username);
        if (rows !== false) {
            const userData = rows[0];
            bcrypt.compare(password, userData.password, function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send({ message: 'Error' });
                } else if (result) {
                    console.log('Berhasil login');
                    req.session.idUser = userData.idAkses;
                    req.session.role = userData.idLevel;
                    if (userData.status === "yes") {
                        return res.sendStatus(200);
                    } else {
                        return res.sendStatus(400)
                    }
                } else {
                    return res.sendStatus(401)
                }
            });
        } else {
            return res.sendStatus(404)
        }
    } catch (error) {
        return res.sendStatus(500)
    }
});


app.get("/dashboard", async (req, res)=>{
    // res.render("index", {namafile: "dashboard"})
    return res.send({message : `${req.session.role}, ${req.session.idUser}`});
})

app.get("/dataMaster", async (req, res)=>{
    const mAset = await db.getAllMasset();
    res.render("index", {namafile: "dataMaster", data: mAset})
})

app.post("/addLevel", async (req, res)=>{
     try {
        const {nama} = req.body;
        await db.addLevel(nama, idUser, idUser)
        res.send({message : 'Berhasil insert'})
     } catch (e) {
        res.send({message : `${e.message}`})
     }
})

app.put("/updateLevel", async(req, res)=>{
    try {
        const {idLevel, namaBaru} = req.body;
        await db.updateLevel(idLevel, namaBaru, idUser)
        res.send({message : 'Berhasil update'})
    } catch (e) {
        res.send({message : `${e.message}`})       
    }
})

app.get("/user", async (req, res)=>{
    try {
        const rows = await db.getAllAkses()
        if(rows != false){
            res.send(rows)
        }else{
            res.send({message : 'Tidak Ada User'})
        }
    } catch (e) {
        res.send({message : `${e.message}`})       
    }
})

app.post("/addUser", async(req, res)=>{
    const {nama, username, password, status} = req.body
    try {
        const respone = await db.addAkses(nama, username, password, status, idAdmin, idUser, idUser)
        if(respone == 200){
            res.send({message : 'Berhasil insert User Baru'})
        }else{
            res.send({message : 'Gagal Insert'})
        }
    } catch (e) {
        res.send({message : `${e.message}`})       
    }
})

app.put("/updateUser", async(req, res)=>{
    const {idAkses, nama, username, password, status, idLevel} = req.body
    try {
        const respone = await db.updateAkses(idAkses, nama, username, password, status, idLevel, idUser, idUser)
        if(respone == 200){
            res.send({message : 'Berhasil update user'})
        }else{
            res.send({message : 'Gagal Update'})
        }
    } catch (e) {
        res.send({message : `${e.message}`})       
    }
})

app.get("/merk", async(req, res)=>{
    try {
        const respone = await db.getAllMerk();
        res.render("index", {namafile: "merk", data: respone})
    } catch (e) {
        res.send({message : `${e.message}`})
    }
})

app.get("/merkId/:id", async(req, res)=>{
    const id = req.params.id
    try {
        const respone = await db.getMerkId(id);
        if(respone != false){
            res.send(respone)
        }else{
            res.send({message : 'Belum ada data'})
        }
    } catch (e) {
        res.send({message : `${e.message}`})
    }
})

app.post("/addMerk", async(req, res)=>{
    const {nama} = req.body
    try {
        const respone = await db.addMerk(nama, idUser)
        if(respone == 200){
            res.send({message : 'Berhasil Insert'})
        }else{
            res.send({message : 'Ada error pada insert'})
        }
    } catch (e) {
        res.send({message : `${e.message}`})
    }
})

app.put("/updateMerk", async(req, res)=>{
    const {nama, id} = req.body
    try {
        const respone = await db.updateMerk(nama, idUser, id)
        if(respone == 200){
            res.send({message : 'Berhasil Insert'})
        }else{
            res.send({message : 'Ada error pada insert'})
        }
    } catch (e) {
        res.send({message : `${e.message}`})        
    }
})

app.delete("/deleteMerk", async (req, res)=>{
    const {id} = req.body
    try {
        await db.delMerk(id)
        res.status(200).send({message : 'Berhasil Hapus Merk'})
    } catch (e) {
        res.send({message : `${e.message}`})        
    }
})

app.get("/kategori", async(req, res)=>{
    try {
        const respone = await db.getAllKategori();
        res.render("kategori", {namafile : "kategori", data : respone})
    } catch (e) {
        res.send({message : `${e.message}`})
    }
})

app.get("/kategoriId/:id", async(req, res)=>{
    const id = req.params.id
    try {
        const respone = await db.getKategoriId(id);
        if(respone != false){
            res.send(respone)
        }else{
            res.send({message : 'Belum ada data'})
        }
    } catch (e) {
        res.send({message : `${e.message}`})
    }
})

app.post("/addKategori", async(req, res)=>{
    const {nama} = req.body
    try {
        const respone = await db.addKategori(nama, idUser)
        if(respone == 200){
            res.send({message : 'Berhasil Insert'})
        }else{
            res.send({message : 'Ada error pada insert'})
        }
    } catch (e) {
        res.send({message : `${e.message}`})
    }
})

app.put("/updateKategori", async(req, res)=>{
    const {nama, id} = req.body
    try {
        const respone = await db.updateKategori(id, nama, idUser)
        if(respone == 200){
            res.send({message : 'Berhasil Update'})
        }else{
            res.send({message : 'Ada error pada Update'})
        }
    } catch (e) {
        res.send({message : `${e.message}`})        
    }
})

const PORT = process.env.PORT || 3333;
app.listen(3333, () => {
    console.log("Web running : " + 3333);
})

