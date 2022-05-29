var express = require('express');
var router = express.Router();
var Drug = require('../models/drug');
const Operation = require("../models/operation");
const Prescription = require("../models/prescription");
const Patient = require("../models/patient");

router.post('/new-drug', async function (req, res) {
    var drug = new Drug({
        nominativo: req.body.nominativo,
        tipologia: req.body.tipologia,
        codice: req.body.codice,
        somministrazione: req.body.somministrazione,
        libretto: req.body.libretto,
    });
    try {
        doc = await drug.save();
        return res.status(200).json({success: true, message: "Farmaco aggiunto correttamente"});
    } catch (err) {
        return res.status(500).json({success: false, message: "E' stato riscontrato un errore di servizio"});
    }
});

router.get('/all', (req, res) => {
    Drug.find().exec()
        .then((result) => {
            res.status(200).json({success: true, data: result});
        }).catch((err) => {
        return res.status(500).json({success: false, message: "E' stato riscontrato un errore di servizio"});
    });
});

router.get('/find-by-id/:id',  (req, res) => {
        const id = req.params.id;
        Drug.findOne({_id: id}).exec()
            .then((result) => {
                res.status(200).json({success: true, data: result});
            }).catch((err) => {
            return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
        });
    }
);

router.put('/update-desc/:id/:desc', (req, res) => {
    Drug.findByIdAndUpdate(req.params.id, {
            $set : {
                libretto: req.params.desc
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