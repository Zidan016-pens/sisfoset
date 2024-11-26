const db = require('./db');

const initDB = async ()=>{
    try {
        const respone1  = await db.getAllLevel()
    if(respone1 == false){
        const initLevel = await db.addLevel("Admin", null, null)
        if(initLevel == 200){
            console.log('Berhasil Init Data 1')
        }
    }
    } catch (error) {
        console.log('pppp')
    }
    
}

module.exports = {initDB}