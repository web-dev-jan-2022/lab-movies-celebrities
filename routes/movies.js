const movieSchema = require("../models/movies");

const router = require("express").Router();

router.get("/movies", (req, res, next) => {
  movieSchema
    .find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

router.get("/movies/create", (req, res) => {
  res.render("movies/create");
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  movieSchema
    .create({ title, genre, plot, cast })
    .then(() => {
      res.redirect("/movies/create");
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/movies/create");
      next(error);
    });
});

router.get("/movies/:id", (req, res, next) => {
  const id = req.params.id;
  movieSchema.findById(id).then((movies) => {
    res.render("movies/movie-details", { movies });
  });
});

module.exports = router;
