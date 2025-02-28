const Player = require("../models/Player");
const { verifyRoll } = require("../utils/provablyFair");

exports.rollDice = async (req, res) => {
  try {
    const { bet } = req.body;
    if (!bet || bet <= 0) return res.status(400).json({ message: "Invalid bet amount" });

    let player = await Player.findOne();
    if (!player) player = await Player.create({ balance: 1000 });

    if (bet > player.balance) return res.status(400).json({ message: "Insufficient balance" });

    const seed = new Date().toISOString();
    const { roll, hash } = verifyRoll(seed);

    let newBalance = player.balance - bet;
    if (roll >= 4) newBalance += bet * 2;

    player.balance = newBalance;
    await player.save();

    res.json({ roll, newBalance, hash });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
