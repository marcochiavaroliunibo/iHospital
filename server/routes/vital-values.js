var express = require('express');
var router = express.Router();
var Vitalvalue = require('../models/vital-value');
const {now} = require("mongoose");

router.post('/new/:my_id/:id_patient', async function (req, res) {
    var vitalvalue = new Vitalvalue({
        id_operatore: req.params.my_id,
        id_paziente: req.params.id_patient,
        press_min: req.body.press_min,
        press_max: req.body.press_max,
        hr: req.body.hr,
        saturazione: req.body.saturazione,
        freq_respriratoria: req.body.freq_respriratoria,
        livello_dolore: req.body.livello_dolore,
        orario_visita: now()
    });
    try {
        doc = await vitalvalue.save();
        return res.status(200).json({success: true, message: "Visita di controllo aggiunta correttamente"});
    } catch (err) {
        return res.status(500).json({success: false, message: "E' stato riscontrato un errore di servizio"});
    }
});

router.get('/all', (req, res) => {
    Vitalvalue.find().exec()
        .then((result) => {
            res.status(200).json({success: true, data: result});
        }).catch((err) => {
        return res.status(500).json({success: false, message: "E' stato riscontrato un errore di servizio"});
    });
});

router.get('/find-by-patient/:id_paziente',  (req, res) => {
        const id_paziente = req.params.id_paziente;
        Vitalvalue.find({id_paziente: id_paziente}).sort({orario_visita: -1}).exec()
            .then((result) => {
                res.status(200).json({success: true, data: result});
            }).catch((err) => {
            return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
        });
    }
);


router.delete('/delete/:id',  (req, res) => {
        const id = req.params.id;
        Vitalvalue.deleteOne({_id: id}).exec()
            .then((result) => {
                res.status(200).json({success: true});
            }).catch((err) => {
            return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
        });
    }
);

module.exports = router;