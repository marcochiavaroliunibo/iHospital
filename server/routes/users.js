var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

router.post('/login', function (req, res, next) {
    User.find({email: req.body.email}).exec()
        .then((result) => {
            if(result.length < 1) return res.status(401).json({success: false, message: "Email non registrata"})
            const user = result[0];
            bcrypt.compare(req.body.password, user.password, (err, ret) => {
                if (ret) {
                    const payload = {userId: user._id}
                    const token = jwt.sign(payload, "webBatch");
                    return res.status(200).json({success: true, user: user, token: token, message: "Login ok"})
                }
                return res.status(401).json({success: false, message: "Password errata, riprova"});
            })
        }).catch(err => {return res.status(500).json({success: false, message: "E' stato riscontrato un errore di servizio"});}
    )
});

router.post('/registrati',  function (req, res) {
    var user = new User({
        nome: req.body.nome,
        cognome: req.body.cognome,
        data_nascita: req.body.nascita,
        email: req.body.email,
        ruolo: req.body.ruolo,
        password: User.hashPassword(req.body.password)
    });
    user.save().then((_) => {
        res.status(200).json({success: true, message: "Account creato correttamente, effettua il login"});
    }).catch((err) => {
        if (err.code === 11000) return res.status(401).json({success: false, message: "Email già registrata nel sistema"});
        res.status(500).json({success: false, message: "Si è verificato un errore al server, riprova tra poco"});
    });
});

router.get('/user-logged', checkAuth, (req,res) => {
    const userId = req.userData.userId;
    User.findById(userId).exec()
        .then((result) => {
            return res.status(200).json({success: true, data: result})
        }).catch(err => { res.status(500).json({success: false, message: "Server error"});}
    )
});

router.get('/find-email/:email',  (req, res) => {
        const email = req.params.email;
        User.findOne({email: email}).exec()
            .then((result) => {
                res.status(200).json({success: true, data: result});
            }).catch((err) => {
            return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
        });
    }
);

router.get('/find-role/:role',  (req, res) => {
        const role = req.params.role;
        User.find({ruolo: role}).exec()
            .then((result) => {
                res.status(200).json({success: true, data: result});
            }).catch((err) => {
            return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
        });
    }
);

router.get('/find-id/:id',  (req, res) => {
        const id = req.params.id;
        User.findById(id).exec()
            .then((result) => {
                res.status(200).json({success: true, data: result});
            }).catch((err) => {
            return res.status(404).json({success: false, message: "E' stato riscontrato un errore di servizio"});
        });
    }
);

router.put('/update-pwd/:id', (req, res) => {
    User.findOneAndUpdate({_id: req.params.id}, {
            $set : {
                password: User.hashPassword(req.body.pwd)
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


