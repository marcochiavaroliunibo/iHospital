var express = require('express');
var router = express.Router();
var Patient = require('../models/patient');
const {now} = require("mongoose");
const mongoose = require("mongoose");

router.post('/new-patient', async function (req, res) {
    var patient = new Patient({
        nome: req.body.nome,
        cognome: req.body.cognome,
        data_nascita: req.body.data_nascita,
        luogo_nascita: req.body.luogo_nascita,
        reparto: req.body.reparto,
        orario_ricovero: now(),
        motivo_ricovero: req.body.motivo_ricovero,
        cartella_clinica: req.body.cartella_clinica,
    });
    patient.save().then((_) => {
        res.status(200).json({success: true, message: "Paziente creato correttamente"});
    }).catch((err) => {
        res.status(500).json({success: false, message: "Si è verificato un errore al server, riprova tra poco"});
    });
});

router.get('/all', (req, res) => {
    Patient.find().exec()
        .then((result) => {
            res.status(200).json({success: true, data: result});
        }).catch((err) => {
            return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
        })
});

router.get('/current', (req, res) => {
    Patient.find({ $or: [ {orario_dimissioni: {$gte: now()} }, {orario_dimissioni: undefined} ]}).exec()
        .then((result) => {
            res.status(200).json({success: true, data: result});
        }).catch((err) => {
        return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
    })
});

router.get('/dismiss', (req, res) => {
    Patient.find({orario_dimissioni: {$lte: now()}}).exec()
        .then((result) => {
            res.status(200).json({success: true, data: result});
        }).catch((err) => {
        return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
    })
});

router.get('/:id',  (req, res) => {
    const id = req.params.id;
    Patient.findById(id).exec()
        .then((result) => {
            res.status(200).json({success: true, data: result});
        }).catch((err) => {
        return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
    });
});

router.put('/update/:id', (req, res) => {
    Patient.findByIdAndUpdate(req.params.id, {
        $set : {
            nome: req.body.nome,
            cognome: req.body.cognome,
            data_nascita: req.body.data_nascita,
            luogo_nascita: req.body.luogo_nascita,
            reparto: req.body.reparto,
            orario_ricovero: req.body.orario_ricovero,
            motivo_ricovero: req.body.motivo_ricovero,
            cartella_clinica: req.body.cartella_clinica,
            orario_dimissioni: req.body.orario_dimissioni
        }
    },
        {
            new: true
        },
        function (err, updatePatient) {
            if (err) return res.status(500).json({success: false, messagge: "errore update"});
            else return res.status(200).json({success: true, message: "Aggiornamento dati completato"})
        })
});

router.put('/quit/:id', (req, res) => {
    Patient.findByIdAndUpdate(req.params.id, {
            $set : {
                orario_dimissioni: now()
            }
        },
        {
            new: true
        },
        function (err, updatePatient) {
            if (err) return res.status(500).json({success: false, messagge: "errore update"});
            else return res.status(200).json({success: true, message: "Aggiornamento dati completato"})
        })
});

module.exports = router;