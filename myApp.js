const db = require('./backend/db');
const express = require("express");
const { initDB } = require('./backend/initilizing');
const app = express();

let idUser;
const idAdmin = "LyPiw";
const bcrypt = require('bcrypt')

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}));

// app.get("/", async (req, res)=>{
//     try {
//         const [rows] = await db.getAllLevel();
//         res.send(rows)
//     } catch (e) {
//         res.send({message : 'Error'})
//     }
// })

const authMiddleware = (req, res, next) => {
    if (!idUser) {
        return res.status(401).send("Anda Harus Login Terlebih Dahulu");
    }
    next();
};

app.get("/", async (req, res)=>{
    try {
        const rows = await db.getAksesByNama("Dev")
        const password = "Password"
        if(rows != false){
            const userData = rows[0]
            bcrypt.compare(password, userData.password, function(err, result){
                if(err){
                    console.log(err)
                    return;
                }else if(result){
                    console.log('Berhasil login')
                    idUser = userData.idAkses
                    if(userData.status == "yes"){
                        res.send({message : 'Berhasil Login'})
                    }else{
                        res.send({message : 'Akun Anda di nonaktifkan'})
                    }
                }else{
                    res.send({message : 'Kata sandi Salah'})
                }
            })
        }else{
            res.send({message : 'Username Tidak Di Temukan'})
        }
    } catch (error) {
        res.send({message : 'Error'})
    }
})

app.post("/addLevel", authMiddleware, async (req, res)=>{
     try {
        const {nama} = req.body;
        await db.addLevel(nama, idUser, idUser)
        res.send({message : 'Berhasil insert'})
     } catch (e) {
        res.send({message : `${e.message}`})
     }
})

app.put("/updateLevel", authMiddleware, async(req, res)=>{
    try {
        const {idLevel, namaBaru} = req.body;
        await db.updateLevel(idLevel, namaBaru, idUser)
        res.send({message : 'Berhasil update'})
    } catch (e) {
        res.send({message : `${e.message}`})       
    }
})

app.get("/user", authMiddleware, async (req, res)=>{
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

app.put("/updateUser", authMiddleware, async(req, res)=>{
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

app.listen(3333, () => {
    console.log("Web running : " + 3333);
})
