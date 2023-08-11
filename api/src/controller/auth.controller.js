const mssql = require('mssql')
const bcrypt = require('bcrypt')

const { registrationSchema } = require('../utils/validator')
const { sqlConfig } = require('../config/database.connection.config')

module.exports.register = async(req, res)=>{
    try {
        //check if body is empty
        if(!req.body){
            return res.status(400).json({error: 'The request body can not be empty'})
        }
        //sanitize the input
        const {firstName, lastName, email, password, cohortNumber} = req.body
        const { error } = registrationSchema.validate({firstName, lastName, email, password, cohortNumber})
    
        if(error){
            return res.status(422).json({error: error.message})
        }
        // check if email is registered
        const pool = await mssql.connect(sqlConfig)
    
        const checkMailQuery = await pool
        .request()
        .input('email', email)
        .execute('fetchUserByEmailPROC')
    
        if(checkMailQuery.rowsAffected[0] == 1){
            return res.status(400).json({error: 'This email is already registered'})
        }else{
            const hashedPwd = await bcrypt.hash(password, 10)
             await pool
            .request()
            .input('first_name', firstName)
            .input('last_name', lastName)
            .input('email', email)
            .input('password', hashedPwd)
            .input('cohort_number', cohortNumber)
            .execute('createNewUserProc')
    
            return res.status(201).json({message: 'Account created successfully'})
            
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: 'Internal server error'})
    }
}