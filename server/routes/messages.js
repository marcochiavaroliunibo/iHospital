var express = require('express');
var router = express.Router();
var Message = require('../models/message');
const {now} = require("moment");

router.post('/new', async function (req, res) {
    var message = new Message({
        id_operatore: req.body.id_operatore,
        id_paziente: req.body.id_paziente,
        testo: req.body.testo,
        data_ora: now(),
    });
    try {
        doc = await message.save();
        return res.status(200).json({success: true, message: "Messaggio registrato"});
    } catch (err) {
        return res.status(500).json({success: false, message: "E' stato riscontrato un errore di servizio"});
    }
});


router.get('/:id_paziente',  (req, res) => {
        const id_paziente = req.params.id_paziente;
        Message.find({id_paziente: id_paziente}).sort({data_ora: 1}).exec()
            .then((result) => {
                res.status(200).json({success: true, data: result});
            }).catch((err) => {
            return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
        });
    }
);


module.exports = router;