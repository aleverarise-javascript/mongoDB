"use strict";

var Fruta = require("../models/fruta");

function pruebas(req, res) {
  res.status(200).send({
    message: "Esta ruta es de prueba"
  });
}

function saveFruta(req, res) {
  var fruta = new Fruta();

  var params = req.body;
  if (params.nombre) {
    fruta.nombre = params.nombre;
    fruta.color = params.color;
    fruta.temporada = params.temporada;

    fruta.save((error, frutaStore) => {
      if (error) res.status(500).send({ message: "Error en el servidor" });
      else if (frutaStore)
        res.status(200).send({
          fruta: frutaStore
        });
      else res.status(200).send({ message: "No se ha guardado la fruta" });
    });
  } else {
    res.status(200).send({ message: "El nombre es requerido" });
  }
}

function getFrutas(req, res) {
  Fruta.find({})
    .sort({ _id: -1 })
    .exec((error, frutas) => {
      if (error) res.status(500).send({ message: "Error en el servidor" });
      else if (frutas)
        res.status(200).send({
          frutas
        });
      else res.status(404).send({ message: "No hay frutas" });
    });
}

function getFruta(req, res) {
  var frutaID = req.params.id;
  Fruta.findById(frutaID).exec((error, fruta) => {
    if (error) res.status(500).send({ message: "Error en el servidor" });
    else if (fruta)
      res.status(200).send({
        fruta
      });
    else res.status(404).send({ message: "No hay fruta" });
  });
}

function updateFruta(req, res) {
  var frutaID = req.params.id;
  var update = req.body;

  Fruta.findByIdAndUpdate(
    frutaID,
    update,
    { new: true },
    (error, frutaUpdated) => {
      if (error) res.status(500).send({ message: "Error en el servidor" });
      else if (frutaUpdated)
        res.status(200).send({
          frutaUpdated
        });
      else res.status(404).send({ message: "Error actualizando" });
    }
  );
}

function deleteFruta(req, res) {
  var frutaID = req.params.id;
  Fruta.findByIdAndRemove(frutaID, (error, frutaRemoved) => {
    if (error) res.status(500).send({ message: "Error en el servidor" });
    else if (frutaRemoved)
      res.status(200).send({
        frutaRemoved
      });
    else res.status(404).send({ message: "Error borrando" });
  });
}

module.exports = {
  pruebas,
  saveFruta,
  getFrutas,
  getFruta,
  updateFruta,
  deleteFruta
};
