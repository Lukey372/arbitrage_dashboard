const { Router } = require('express');
const crypto = require('crypto');
const Web3 = require("web3");

const jwt = require("jsonwebtoken");

const router = Router();

const web3 = new Web3();

const { SECRET_KEY } = process.env;

router.get('/random', (req, res) => {
    crypto.randomBytes(64, (err, buffer) => {
        let random = buffer.toString('hex');
        res.json({ random });
    });
});

router.post('/verify', (req, res) => {

    const { random, signature, address } = req.body;

    console.log({ random, signature, address });

    const signingAddress = web3.eth.accounts.recover(random, signature);

    if (signingAddress.toLowerCase() != address.toLowerCase()) return res.status(400);

    const token = jwt.sign({ random, signature, address: signingAddress }, SECRET_KEY);

    console.log({ token })

    res.json({ token });

});

module.exports = router;
