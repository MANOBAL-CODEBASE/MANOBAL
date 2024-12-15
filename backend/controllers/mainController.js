const jwt = require("jsonwebtoken");

const assesment = (req,res)=>{
    return res.status(200).send({
        sucess: true,
        message: 'sucessfully!!',
      });
}
module.exports = assesment;