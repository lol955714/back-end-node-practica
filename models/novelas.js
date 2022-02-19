exports = module.exports = function(app, mongoose) {
let novela = new mongoose.Schema({
    title: { type: String },
    year: { type: Date },
    country: { type: String },
    poster: { type: String },
    seasons: { type: Number },
    genre: {
            type: String,
            enum: ["Drama", "Fantasy", "Sci-Fi", "Thriller", "Comedy"],
    },
    summary: { type: String },
});
mongoose.model("novela", novela);
}