var express = require('express');
var router = express.Router();
var MedicAssignment = require('../models/medic-assignment');
const Patient = require("../models/patient");

router.post('/new', async function (req, res) {
    var medicAssignment = new MedicAssignment({
        id_medico: req.body.id_medico,
        id_paziente: req.body.id_paziente
    });
    try {
        doc = await medicAssignment.save();
        return res.status(200).json({success: true, message: "Medico aggiunto correttamente al paziente"});
    } catch (err) {
        return res.status(500).json({success: false, message: "E' stato riscontrato un errore di servizio"});
    }
});

router.get('/patient/:id_paziente',  (req, res) => {
        const id_paziente = req.params.id_paziente;
    MedicAssignment.find({id_paziente: id_paziente}).exec()
            .then((result) => {
                res.status(200).json({success: true, data: result});
            }).catch((err) => {
            return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
        });
    }
);

router.get('/medic/:id_medico',  (req, res) => {
        const id_medico = req.params.id_medico;
    MedicAssignment.find({id_medico: id_medico}).exec()
            .then((result) => {
                res.status(200).json({success: true, data: result});
            }).catch((err) => {
            return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
        });
    }
);

router.get('/:id_paziente/:id_medico',  (req, res) => {
        const id_medico = req.params.id_medico;
        const id_paziente = req.params.id_paziente;
    MedicAssignment.findOne({id_medico: id_medico, id_paziente: id_paziente}).exec()
            .then((result) => {
                res.status(200).json({success: true, data: result});
            }).catch((err) => {
            return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
        });
    }
);

router.delete('/delete/:id_paziente/:id_medico',  (req, res) => {
        const id_medico = req.params.id_medico;
        const id_paziente = req.params.id_paziente;
        MedicAssignment.deleteOne({id_medico: id_medico, id_paziente: id_paziente}).exec()
            .then((result) => {
                res.status(200).json({success: true});
            }).catch((err) => {
            return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
        });
    }
);

module.exports = router;