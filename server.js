  let bodyParser      = require("body-parser"),
      methodOverride  = require("method-override"),
      mongoose        = require('mongoose'),
      moment          = require('moment');
  const express = require('express');
  const app = express();

   mongoose.connect("mongo/ola", function (err, res) {
       if (err) throw err;
           console.log('Connected to Database');
         });
  
  //const morgan = require('morgan');
  const cors = require('cors');
  const path = require('path');
  // Middlewares
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(methodOverride());
  //app.use(morgan('tiny'));
  app.use(cors());
  //
  //const history = require('connect-history-api-fallback');
  //app.use(history());
  app.use('/public', express.static(__dirname+'/public'));
  //app.use('/static', express.static(__dirname + '/public'));
  //
  let novela     = require('./models/novelas')(app, mongoose);
  let foto     = require('./models/fotos')(app, mongoose);

  let novelaCtrl = require('./controllers/novelas');
  let fotoCtrl = require('./controllers/fotos')
  //
  let router = express.Router();
  router.get("/ola", function (req, res) {
    res.send("Hello !");
  });
  app.use(router);

  let novels = express.Router();
  novels.route('/novelas')
    .get(novelaCtrl.findAllNovelas)
    .post(novelaCtrl.addNovela);
  novels.route('/novelas/:id')
    .get(novelaCtrl.findById)
    .put(novelaCtrl.updateNovela)
    .delete(novelaCtrl.deleteNovela);

  app.use('/api', novels);

  let fotos = express.Router();
  fotos.route('/fotos')
    .get(fotoCtrl.findAllFotos)
    .post(fotoCtrl.addFoto);
  fotos.route('/fotos/:id')
    .delete(fotoCtrl.deleteFoto)

  app.use('/api',fotos);

  app.listen(3000, function () {
       console.log("Node server running on http://localhost:3000/api");
     });

