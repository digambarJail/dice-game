const CryptoJS = require("crypto-js");

const generateHash = (seed) => {
  return CryptoJS.SHA256(seed).toString();
};

const verifyRoll = (seed) => {
  const hash = generateHash(seed);
  const roll = (parseInt(hash.substring(0, 8), 16) % 6) + 1; // Get roll from hash
  return { roll, hash };
};

module.exports = { generateHash, verifyRoll };
