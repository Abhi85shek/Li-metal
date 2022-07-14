const bcrypt = require('bcrypt');
require('dotenv');
const hashing = async (password)=>{
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    return hash;
};
module.exports = hashing;