/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt

    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());



function readFile(path){

  // var fileData =[];
  // fs.readFile(path, 'utf8', (err, data) => {
  //   if (err) throw err;
  //   filesData = data;
  //   console.log(data);
  // });
  // return fileData;
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });

}

function readFileNames(path){
//  var filesArray = []
//   fs.readdir(path,'utf8', (err,files) => {
//     if (err) throw err;
//     filesArray = files;
//     console.log(files);
   
//   })

//   return filesArray;
return new Promise((resolve, reject) => {
  fs.readdir(path, 'utf8', (err, files) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(files);
  });
});
}


function getAllFilesName(req,res){

  
  var filesNameArray =[]
  readFileNames('./files').then(files => {
    console.log(files);
    res.send(files);
  })
  .catch(err => {
    console.error(err);
    res.send("No files");
  });
  // res.send(filesNameArray);
 
  
}

function getFileContent(req,res){
  const dirPath = './files/' + req.params.filename;
  var fileContent = {}
 readFile(dirPath).then(data => {
    console.log(data);
    res.send(data);
  })
  .catch(err => {
    console.error(err);
    res.send("No content")
  });
 
  // res.send(fileContent);
 
 
}

app.get('/files', getAllFilesName);
app.get('/file/:filename', getFileContent);

app.listen(port,()=>{
  console.log(`Todo Server listening on ${port}`)});



module.exports = app;
