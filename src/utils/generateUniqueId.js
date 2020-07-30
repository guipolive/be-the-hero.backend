const crypto = require('crypto'); 

module.exports = function generateUniqueId(){
    return crypto.randomBytes(4).toString('HEX'); // nosso id será igual a 4 bytes de caracteres aleatórios convertidos para HEXADECIMAL
}