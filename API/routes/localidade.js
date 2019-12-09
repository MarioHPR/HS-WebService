var express = require('express');
var router = express.Router();
var app = express();

var mysql = require('mysql');
var consMysql = 'mysql://root:@localhost:3306/bancoTcc';

router.post('/', function (req, res, next) {
    console.log("entrou no axios local");
    let local = [];
    local.push(req.body.cidade);
    local.push(req.body.cep);
    local.push(req.body.bairro);
    local.push(req.body.rua);
    local.push(req.body.numero);
    const connection = mysql.createConnection(consMysql);
    var sql = "INSERT INTO Localidade (cidade,cep,bairro,rua,numero) VALUES (?,?,?,?,?)";
    connection.query(sql, local, function (error, result) {
        if (error) {
            console.log(error)
            return res.status(304).end();
        }
        let resposta = { id: result.insertId };
        console.log(resposta);
        return res.status(201).json(resposta);
    });
});

router.delete('/:id', function (req, res, next) {
    let local = [];
    local.push(req.params.id);
    const connection = mysql.createConnection(consMysql);
    let sql = "DELETE FROM Localidade WHERE id = ?";
    connection.query(sql, local, function (error, results) {
        if (error) {
            return res.status(304).end();
        }
        let resposta = results[0];
        return res.status(200).send(resposta);
    });
});

router.put('/:id', function (req, res) {// fazer ainda tirar duvida com Prof. Carlos
    let local = [];
    local.push(req.body.cidade);
    local.push(req.body.cep);
    local.push(req.body.bairro);
    local.push(req.body.rua);
    local.push(req.body.numero);
    local.push(req.body.id);

    const connection = mysql.createConnection(consMysql);
    connection.query("UPDATE local SET cidade=? ,cep=?, bairro=?, rua=?,numero=? WHERE id = ?", local, function (error, results) {
        if (error) {
            return res.status(304).end();
        }
        let resposta = results[0];
        return res.status(200).send(resposta);
    });
});

module.exports = router;