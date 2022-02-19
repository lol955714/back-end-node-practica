exports = module.exports = function(app, mongoose) {
    let foto = new mongoose.Schema({
        urlStorage : { type: String }
    });
    mongoose.model("foto", foto);
    }