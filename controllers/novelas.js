var mongoose = require("mongoose");
var novela = mongoose.model("novela");

//GET - Return all tvshows in the DB
exports.findAllNovelas = function (req, res) {
  novela.find(function (err, novelas) {
    if (err) res.send(500, err.message);
    res.status(200).jsonp(novelas);

  });
};
exports.findById = function(req, res) {
    novela.findById(req.params.id, function(err, novela) {
    if(err) return res.send(500, err.message);
    res.status(200).jsonp(novela);
    });
};
exports.addNovela = function (req, res) {  
    var nove = new novela({
      title: req.body.title,
      year: req.body.year,
      country: req.body.country,
      poster: req.body.poster,
      seasons: req.body.seasons,
      genre: req.body.genre,
      summary: req.body.summary,
    });
    nove.save(function (err, novela) {
      if (err) return res.status(500).send(err.message);
      res.status(200).jsonp(novela);
    });
  };
  exports.updateNovela = function (req, res) {
    novela.findById(req.params.id, function (err, nove) {
    console.log(req.body)
    nove.id=req.body._id
    nove.title = req.body.title;
    nove.year = req.body.year;
    nove.country = req.body.country;
    nove.poster = req.body.poster;
    nove.seasons = req.body.seasons;
    nove.genre = req.body.genre;
    nove.summary = req.body.summary;

    nove.save(function (err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(novela);
      });
    });
  };
  exports.deleteNovela = function (req, res) {
    novela.findById(req.params.id, function (err, nove) {
      nove.remove(function (err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send();
      });
    });
  };