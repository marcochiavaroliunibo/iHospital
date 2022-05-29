var express = require('express');
var router = express.Router();
var Administration = require('../models/administration');
const {now} = require("mongoose");
const Prescription = require("../models/prescription");

router.post('/new/:id/:inf', async function (req, res) {
    var administration = new Administration({
        id_prescrizione: req.params.id,
        id_infermiere: req.params.inf,
        data_ora: now(),
        note: "Nessuna nota inserita."
    });
    try {
        doc = await administration.save();
        return res.status(200).json({success: true, message: "Medicinale aggiunto correttamente al paziente"});
    } catch (err) {
        return res.status(500).json({success: false, message: "E' stato riscontrato un errore di servizio"});
    }
});

router.get('/find-by-interval/:id/:start',  (req, res) => {
    const start = req.params.start;
    const id = req.params.id;
    Administration.find({id_prescrizione: id, data_ora: {$gte: start}}).sort({data_ora: -1}).exec()
            .then((result) => {
                res.status(200).json({success: true, data: result});
            }).catch((err) => {
            return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
        });
});

router.get('/find-by-prescription/:id',  (req, res) => {
    const id = req.params.id;
    Administration.find({id_prescrizione: id}).exec()
        .then((result) => {
            res.status(200).json({success: true, data: result});
        }).catch((err) => {
        return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
    });
});

router.get('/find-by-nurse/:id',  (req, res) => {
    const id = req.params.id;
    Administration.find({id_infermiere: id}).exec()
        .then((result) => {
            res.status(200).json({success: true, data: result});
        }).catch((err) => {
        return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
    });
});

router.put('/update/:id/:note', (req, res) => {
    Administration.findByIdAndUpdate(req.params.id, {
            $set : {
                note: req.params.note
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