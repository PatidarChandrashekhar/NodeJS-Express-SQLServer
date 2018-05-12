var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  //res.render('index', { title: 'Express' });
  GetData(function (recordset) {
    res.render('index', { employees: recordset });
  })
});

function GetData(callback) {
  var sql = require('mssql');
  var config = {
    user: 'CHANDRA',
    password: 'Sarkar@3690',
    database: 'SARKAR',
    server: 'SARKAR-NB\\\SARKAR2017'
  }
  var connection = new sql.connect(config, function (err) {
    //check the error
    var request = new sql.Request(connection);
    request.query('SELECT ID,Name FROM [SARKAR].[dbo].[tblEmployee]', function (err, recordset) {
      callback(recordset);
    })
  })
}

module.exports = router;
