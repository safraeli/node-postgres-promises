var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var cn = {
    host: 'db-99a9b4da-4c26-45b1-aaa3-418d1bf17f40.c7uxaqxgfov3.us-west-2.rds.amazonaws.com',
    port: 5432,
    database: 'postgres',
    user: 'ummeikj4738at72o',
    password: 'r6rjl7eropr39qxfuedqiw3ca'
};
var db = pgp(cn);

// add query functions

module.exports = {
  getAllPuppies: getAllPuppies,
  getSinglePuppy: getSinglePuppy
};

function getAllPuppies(req, res, next) {
  db.any('SELECT * FROM "joblog"')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL puppies'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSinglePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.one('select * from joblog where id = $1', pupID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}