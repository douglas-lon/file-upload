const express = require("express");
const path = require('path');
const multer = require('multer')
fs = require('fs');

const app = express();
const upload = multer()
let id = JSON.parse(fs.readFileSync('fileID.json', 'utf8')).currentID

const saveFiles = (files) => {
    let file = files[0]
    let obj = JSON.parse(fs.readFileSync('fileID.json', 'utf8'))
    id = obj.currentID

    fs.writeFile(`./saved/${id} - ${file.originalname}`, file.buffer, (err) => {
      if (err) return console.log(err);
      console.log('Conteudo Salvo');
    })
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
});


app.post("/upload", upload.any(), (req, res) => {
    
    saveFiles(req.files)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.end('Done')
})

app.get('/show', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/listar_arquivos.html'))
})

app.get('/filelist', (req, res) => {
    let fileList = fs.readdirSync('./saved')
    //console.log(fileList)
    res.send({list: fileList})
})

app.get('/increment', (req, res) =>{
    id++
    let newId = {
        currentID: id
    }

    fs.writeFile('fileID.json', JSON.stringify(newId), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    

    res.sendStatus(200)
})


app.use("/static", express.static('./client/static/'));

app.listen(3000, '192.168.0.79', () => {
    console.log("Listen on the port 3000...");
    
});