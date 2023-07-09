const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

Movie.belongsToMany(Genre, {through: "movieGenre"});
Genre.belongsToMany(Movie, {through: "movieGenre"});

Actor.belongsToMany(Movie, {through: "actorMovie"});
Movie.belongsToMany(Actor, {through: "actorMovie"});

Director.belongsToMany(Movie, {through: "directorMovie"});
Movie.belongsToMany(Director, {through: "directorMovie"});