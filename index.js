const express = require('express')
const bodyParser = require('body-parser')
var mysql = require('mysql')

const app = express()
const jsonParser = bodyParser.json()

app.listen(3000)

var con = mysql.createConnection({
  host: "localhost",
  user: "tccdh21b",
  password: "daniheitor",
  database: "tccdaniheitor"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Conectado!");
});

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.get("/produto/", function (req,res){
  var sql = "SELECT * FROM produto"
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send( result )
  })
})

app.get("/produto/:id", function(req,res){
  var sql = "SELECT * FROM produto WHERE id = ?"
  var values = [req.params.id]
  con.query(sql, values, function (err, result) {
    if (err) throw err;
    if( result.length == 0 ){
      res.status( 404 ).send({})
    }else{
      res.send( result )
    }
  });
})

app.post("/produto/", jsonParser, function( req, res ){
  var sql = "INSERT INTO produto (titulo, descricao, preco, img, tag) VALUES (?,?,?,?,?)";
  var values = [req.body.titulo, req.body.descricao, req.body.preco, req.body.img, req.body.tag]
  con.query(sql, values, function (err, result) {
    if (err) throw err;
    const novoProduto = {
      id: result.insertId,
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      preco: req.body.preco,
      img: req.body.img,
      tag: req.body.tag
    };
    res.send( novoProduto );
  });
});

app.put("/produto/:id",jsonParser, function(req,res){
  var sql = "UPDATE produto SET titulo = ?, descricao = ?, preco = ?, img = ?, tag = ? WHERE id = ?";
  var values = [req.body.titulo, req.body.descricao, req.body.preco, req.body.img, req.body.tag, req.params.id]
  con.query(sql, values, function (err, result) {
    if (err) throw err;
    if( result.affectedRows == 0 ){
      res.status( 404 ).send( {} )
    }else{
      const novoProduto = {
        id: req.params.id,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        preco: req.body.preco,
        img: req.body.img,
        tag: req.body.tag
      };
      res.send( novoProduto );
    }
  });
});

app.delete("/produto/:id", jsonParser, function(req, res){
  var sql = "DELETE FROM produto WHERE id = ?";
  var values = [req.params.id]
  con.query(sql, values, function (err, result) {
    if (err) throw err;
     if( result.affectedRows == 0 ){
      res.status( 404 ).send( {} );
    }else{
      res.status(204).send( {} );
    }
  });
  
});