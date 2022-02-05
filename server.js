var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');
 mongoose.connect("mongo/ola", function (err, res) {
         if (err) throw err;
         console.log('Connected to Database');
       });
// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
//
var novela     = require('./models/novelas')(app, mongoose);
var novelaCtrl = require('./controllers/novelas');
//
var router = express.Router();
router.get("/", function (req, res) {
  res.send("Hello World!");
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