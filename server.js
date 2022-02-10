  var express         = require("express"),
      app             = express(),
      feathers        = require('@feathersjs/feathers'),
      bodyParser      = require("body-parser"),
      methodOverride  = require("method-override"),
      socketio        = require('@feathersjs/socketio'),
      mongoose        = require('mongoose');
  mongoose.connect("mongo/ola", function (err, res) {
      if (err) throw err;
          console.log('Connected to Database');
        });
  
  // const morgan = require('morgan');
  const cors = require('cors');
  // const path = require('path');
  // Middlewares
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  // app.use(morgan('tiny'));
  app.use(cors());
  //
  //const history = require('connect-history-api-fallback');
  //app.use(history());
  // app.use(express.static(path.join(__dirname, 'public')));
  //
  var novela     = require('./models/novelas')(app, mongoose);
  var novelaCtrl = require('./controllers/novelas');
  //
  var router = express.Router();
  router.get("/", function (req, res) {
    res.send("Hello !");
  });
  app.use(router);
  var novels = express.Router();
  novels.route('/novelas')
    .get(novelaCtrl.findAllNovelas)
    .post(novelaCtrl.addNovela);
  novels.route('/novelas/:id')
    .get(novelaCtrl.findById)
    .put(novelaCtrl.updateNovela)
    .delete(novelaCtrl.deleteNovela);
  app.use('/api', novels);
  app.listen(3000, function () {
      console.log("Node server running on http://localhost:3000");
    });