const express = require("express");
const { rollDice, getBalance } = require("../controllers/diceController");

const router = express.Router();

router.post("/roll-dice", rollDice);
router.get("/get-balance", getBalance);


module.exports = router;
