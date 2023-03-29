const mysql = require('mysql2');
const authMiddleware = require('../middlewares/auth');
const config = require('../config');

// create the connection to database
const connection = mysql.createConnection(
 config.database
);

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', authMiddleware, function(req, res, next) {
  connection.query("select * from todos", (err,results) => {
    if (err) {
      res.status(500)
      return res.json({ error: JSON.stringify(err) })
    }
    return res.json(results);
  })
});

router.post('/', authMiddleware, function(req, res, next) {
  console.log(req.body);
  if (
    req.body.title === undefined || req.body.title.length === 0 ||
    req.body.description === undefined || req.body.description.length === 0) {
    return res.json({error:"Missing value"})
  }
  const now = new Date();
  const timestamp = now.toISOString().slice(0, 19).replace('T', ' ');
  const response = connection.execute("insert into todos (title,description,created_at) values(?,?,?)", [req.body.title, req.body.description, timestamp], (err, result) => {
    if (err) {
      res.status(500)
      return res.json({ error: JSON.stringify(err) })
    }
    const id = result.insertId;
    return res.json({ ...req.body, id })
  })
});

router.delete('/:id', authMiddleware, function(req, res, next) {
  if (req.params.id === undefined || isNaN(req.params.id)) {
    res.status(400);
    return res.json({error:"Missing value"})
  }
  connection.query("delete from todos where id =?", [req.params.id], (err) => {
    if (err) {
      res.status(500)
      return res.json({ error: JSON.stringify(err) })
    }
    return res.json({message:"success"});
  })
});
module.exports = router;
