import mssql from 'mssql'
import * as bcrypt from 'bcrypt'

import { register } from '../src/controller/auth.controller'



describe("Employee register controller test suite", ()=>{

    it('should fail when the request body is empty', async()=>{
        const request = {}
        
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await register(request, response)

        expect(response.status).toHaveBeenCalledWith(400)
        expect(response.json).toHaveBeenCalledWith({error: 'The request body can not be empty'})
    })

    it('should fail if email provided is already registered', async()=>{
        
        const request={
            body : {
                firstName: "Paul",
                lastName: "Sanga",
                email: "paul@gmail.com",
                password: "pajoy9903",
                cohortNumber: "17"
            }
        }

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({rowsAffected: [ 1 ]})
        })

        await register(request, response)
        expect(response.status).toHaveBeenCalledWith(400)
        expect(response.json).toHaveBeenCalledWith({error: 'This email is already registered'})
    })

    it('should create a new account when email is not registered and request body is not empty', async()=>{
        
        const request = {
            body : {
                firstName: "Paul",
                lastName: "Sanga",
                email: "paul@gmail.com",
                password: "pajoy9903",
                cohortNumber: "17"
            }          
        }

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({rowsAffected: [0]})
        })

        jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword123');
        

        await register(request, response)

        expect(response.status).toHaveBeenCalledWith(201)
        expect(response.json).toHaveBeenCalledWith({
            message: 'Account created successfully',
        })
    })

})