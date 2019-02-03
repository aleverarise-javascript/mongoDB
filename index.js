"use strict";

var mongoose = require("mongoose");
var app = require("./app");
var port = 3800;

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/curso_mongo", { useNewUrlParser: true })
  .then(() => {
    console.log("La conexion a mongodb se ha realizado.");
    app.listen(port, () => console.log("El servidor esta corriendo"));
  })
  .catch(error => {
    console.log("Error: " + error);
  });
