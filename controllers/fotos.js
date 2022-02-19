let mongoose = require("mongoose");
let fs = require('fs');
const { now } = require("moment");
let foto = mongoose.model("foto");

exports.findAllFotos = function (req, res) {
    foto.find(function (err, foto) {
      if (err) res.send(500, err.message);
      res.status(200).jsonp(foto);
  
    });
  };
  exports.addFoto = function (req, res) {
    let image = req.body.image
    console.log(image)
    let base64Image = image.split(';base64,').pop();
    const name = 'public/images/'+Date.now()+'.png';
    fs.writeFile(name, base64Image, {encoding: 'base64'}, function(err) {
      let fot = new foto({
        urlStorage:name
      });
      fot.save(function(err, foto){
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(foto);
      });
    });
    };
    
    
    exports.deleteFoto= function (req, res) {
      foto.findById(req.params.id, function (err, fot) {
        if(fot){
          fs.unlink(fot.urlStorage, (err) => {
            if (err) {
              console.error(err)
              return  
            }
          });
          fot.remove(function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(200).send();
          });
        }else{
          return res.status(500)
        }
      });
    };