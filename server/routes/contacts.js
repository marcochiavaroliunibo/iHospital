var express = require('express');
var router = express.Router();
var Contact = require('../models/contact');
const {now} = require("mongoose");
const Patient = require("../models/patient");

router.post('/new', async function (req, res) {
    var contact = new Contact({
        id_operatore: req.body.id_operatore,
        data_ora: now(),
        messaggio: req.body.messaggio,
    });
    try {
        doc = await contact.save();
        return res.status(200).json({success: true, message: "Contatto inviato correttamente al direttore ospedaliero"});
    } catch (err) {
        return res.status(500).json({success: false, message: "E' stato riscontrato un errore di servizio"});
    }
});

router.get('/:id',  (req, res) => {
        const id = req.params.id;
        Contact.find({_id: id}).exec()
            .then((result) => {
                res.status(200).json({success: true, data: result});
            }).catch((err) => {
            return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
        });
    }
);

router.get('/', (req, res) => {
    Contact.find().exec()
        .then((result) => {
            res.status(200).json({success: true, data: result});
        }).catch((err) => {
        return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
    })
});

router.delete('/delete/:id', (req, res) => {
    Contact.deleteOne({_id: req.params.id}).exec()
        .then((result) => {
            res.status(200).json({success: true, data: result});
        }).catch((err) => {
        return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
    })
});

module.exports = router;