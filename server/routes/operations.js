var express = require('express');
var router = express.Router();
var Operation = require('../models/operation');
const {now} = require("mongoose");
const Patient = require("../models/patient");

router.post('/new-operation', async function (req, res) {
    if (req.body.data_ora > now())
        return res.status(401).json({success: false, message: "La data dell'operazione deve essere futura"});
    var operation = new Operation({
        id_paziente: req.body.id_paziente,
        titolo: req.body.titolo,
        data_ora: req.body.data_ora,
        durata: req.body.durata,
        rischio: req.body.rischio,
        descrizione: req.body.descrizione,
    });
    try {
        doc = await operation.save();
        return res.status(200).json({success: true, message: "Operazione calenderizzata correttamente"});
    } catch (err) {
        return res.status(500).json({success: false, message: "E' stato riscontrato un errore di servizio"});
    }
});

router.get('/all', (req, res) => {
    Operation.find((err, docs) => {
        if(!err) res.send(docs);
        else return res.status(201).json(err);
    });
});

router.get('/find-by-patient/:id_paziente',  (req, res) => {
    const id_paziente = req.params.id_paziente;
    Operation.find({id_paziente: id_paziente}).exec()
        .then((result) => {
            res.status(200).json({success: true, data: result});
        }).catch((err) => {
            return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
        });
    }
);

router.get('/:id',  (req, res) => {
    const id = req.params.id;
    Operation.findById(id).exec()
        .then((result) => {
            res.status(200).json({success: true, data: result});
        }).catch((err) => {
        return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
    });
});

router.put('/update/:id', (req, res) => {
    Operation.findByIdAndUpdate(req.params.id, {
            $set : {
                titolo: req.body.titolo,
                data_ora: req.body.data_ora,
                durata: req.body.durata,
                rischio: req.body.rischio,
                descrizione: req.body.descrizione,
                verbale: req.body.verbale,
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