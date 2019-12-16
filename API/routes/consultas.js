var express = require('express');
var router = express.Router();
var app = express();

var mysql = require('mysql');
var consMysql = 'mysql://root:@localhost:3306/bancoTcc';

router.get('/', function (req, res, next) {
	var sql;
	let aux;
	console.log("ENTROU ISSO : "+req.query.id);
	if (req.query.id) {
		aux = req.query.id;
		sql = "SELECT * FROM Consulta WHERE id_usuario = ?";
	} else
		if (req.query.nome) {
			aux = req.query.nome;
			sql = "SELECT * FROM Consulta WHERE nome LIKE ? ";
		}
		else {
			sql = "SELECT * FROM Consulta ORDER BY nome";
		}
	const connection = mysql.createConnection(consMysql);
	connection.connect();
	connection.query(sql, aux, function (error, results) {
		console.log(results);
		if (error) {
			console.log(error);
			return res.status(304).end();
		}
		console.log("aquiiiiiiiiiiiiii: " + results);
		return res.status(200).json(results);
	});
});

router.post('/', function (req, res, next) {
	
	let consulta = [];
	consulta.push(req.body.diagnostico);
	consulta.push(req.body.prescricao);
	consulta.push(req.body.nome_medico);
	consulta.push(req.body.id_usuario);
	consulta.push(req.body.id_instituicao);
	const connection = mysql.createConnection(consMysql);
	var sql = "INSERT INTO Consulta (diagnostico,prescricao,nome_medico,id_usuario,id_instituicao) VALUES (?,?,?,?,?)";
	connection.query(sql, consulta, function (error, result) {
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
	let consulta = [];
	consulta.push(req.params.id);
	const connection = mysql.createConnection(consMysql);
	let sql = "DELETE FROM Consulta WHERE id = ?";
	connection.query(sql, consulta, function (error, results) {
		if (error) {
			return res.status(304).end();
		}
		let resposta = results[0];
		return res.status(200).send(resposta);
	});
});

router.put('/:id', function (req, res) {// fazer ainda tirar duvida com Prof. Carlos
	let consulta = [];
	consulta.push(req.body.diagnostico);
	consulta.push(req.body.prescricao);
	consulta.push(req.body.nome_medico);
	consulta.push(req.body.id_instituicao);
	consulta.push(req.body.id);
	consulta.push(req.params.id_usuario);

	const connection = mysql.createConnection(consMysql);
	connection.query("UPDATE Consulta SET diagnostico=? ,prescricao=? ,nome_medico=?, id_instituicao = ? WHERE id = ? AND id_usuario = ?", consulta, function (error, results) {
		if (error) {
			return res.status(304).end();
		}
		let resposta = results[0];
		return res.status(200).send(resposta);
	});
});

module.exports = router;