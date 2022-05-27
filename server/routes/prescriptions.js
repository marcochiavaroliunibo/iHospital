var express = require('express');
var router = express.Router();
var Prescription = require('../models/prescription');

router.post('/new', async function (req, res) {
    var prescription = new Prescription({
        id_medicina: req.body.farmaco,
        id_paziente: req.body.id_paziente,
        data_inizio: req.body.data_inizio,
        data_fine: req.body.data_fine,
        dosi_giornaliere: req.body.dosi_giornaliere,
        note: req.body.note,
    });
    try {
        doc = await prescription.save();
        return res.status(200).json({success: true, message: "Medicinale aggiunto correttamente al paziente"});
    } catch (err) {
        return res.status(500).json({success: false, message: "E' stato riscontrato un errore di servizio"});
    }
});

router.get('/find-by-patient/:id_paziente',  (req, res) => {
        const id_paziente = req.params.id_paziente;
    Prescription.find({id_paziente: id_paziente}).exec()
            .then((result) => {
                res.status(200).json({success: true, data: result});
            }).catch((err) => {
            return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
        });
    }
);


router.delete('/delete/:id_paziente/:id_medicina',  (req, res) => {
        const id_medicina = req.params.id_medicina;
        const id_paziente = req.params.id_paziente;
        Prescription.deleteOne({id_medicina: id_medicina, id_paziente: id_paziente}).exec()
            .then((result) => {
                res.status(200).json({success: true});
            }).catch((err) => {
            return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
        });
    }
);

router.put('/update/:id/:note', (req, res) => {
    Prescription.findByIdAndUpdate(req.params.id, {
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

router.get('/find-by-id/:id',  (req, res) => {
    const id = req.params.id;
    Prescription.findById(id).exec()
        .then((result) => {
            res.status(200).json({success: true, data: result});
        }).catch((err) => {
        return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
    });
});

module.exports = router;