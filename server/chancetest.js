const Chance = require('chance');
const chance = new Chance();

const newEmail = chance.email();
const newPassword = chance.word()+chance.word()+Math.floor(Math.random()*20000);

module.exports = {newEmail, newPassword};