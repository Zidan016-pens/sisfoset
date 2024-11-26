const db = require('./backend/db');
const express = require("express");
const { initDB } = require('./backend/initilizing');
const app = express();

let idUser;
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
                    res.send({message : 'Berhasil Login'})
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
        const {namaBaru} = req.body;
        await db.updateLevel("LyPiw", namaBaru, idUser)
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

app.listen(3333, () => {
    console.log("Web running : " + 3333);
})
