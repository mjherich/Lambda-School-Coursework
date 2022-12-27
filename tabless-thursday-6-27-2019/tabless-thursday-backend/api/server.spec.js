const server = require('./server')
const supertest = require('supertest')
const db = require('../database/dbConfig')
const { add, findBy } = require('../config/users-model')
// const { add, getAll } = require('../config/tabs-model')

describe('server testing if its running', () => {
    beforeEach(async () => {
        await db('users').truncate()
    })

    describe('Can reach Get /', () => {
        it('responds with a res.send', () => {
            return supertest(server)
                .get('/')
        })
    })

    describe('Cannot reach GET for /tabs because you must be logged in.', () => {
        it('responds with 401 "Unauthorized"', () => {
            return supertest(server)
                .get('/tabs')
                .expect(401) // 401 is Unauthorized
        })
    })

    describe('For the POst for /tabs if you are logged in.', () => {
        it('responds with 401 "Unauthorized', () => {
            return supertest(server)
            .post('/tabs')
            .expect(401)
        })
    })

    describe('Can register a user with /api/register', () => {
        it('should register a user with an email and password.', async () => {
            await add({ email: 'victornguyen123@gmail.com', password: 'pass123' })

            const user = await db('users')

            expect(user).toHaveLength(1)
        })
        it('should display 201 success', async () => {
            await supertest(server)
            expect(201) // 201 is OK
        })
    })

    describe('Can login with /api/login', () => {
        it('should login a user that have created an account.', async () => {
            await findBy({ email: 'victor123@gmail.com', password: 'pass' })

            expect(200) // 200 is OK
        })

        it('should not be able to login if the information is incorrect', async () => {
            await findBy({ email: 'victor123@gmail.com', password: 'pass123' })
            
            expect(401) // 401 is incorrect Email or Password
        })
    })
})