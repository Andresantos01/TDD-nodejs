const request = require('supertest');
const app = require('../../src/app');
const factory = require('../factories');

const truncate = require('../utils/truncate');
describe('Authentication', () => {
    beforeEach(async () => {
        await truncate();
    });
    it('should authenticate with valid credentials', async () => {
        try {
            const user = await factory.create('User', {
                password: '123123'
            })

            const response = await request(app)
                .post('/sessions')
                .send({
                    email: user.email,
                    password: '123123'
                })

            expect(response.status).toBe(200);//ok
        } catch (error) {
            console.log('err')
        }
    });

    it('should not authenticate with invalid credentials', async () => {
        try {
            const user = await factory.create('User', {
                password: '123123'
            })


            const response = await request(app)
                .post('/sessions')
                .send({
                    email: user.email,
                    password: '123456'
                })

            expect(response.status).toBe(401);//invalid
        } catch (error) {
            console.log('err')
        }
    });

    it('should return JWT token when authenticated', async () => {
        try {
            const user = await factory.create('User', {
                password: '123123'
            })


            const response = await request(app)
                .post('/sessions')
                .send({
                    email: user.email,
                    password: '123123'
                })

            expect(response.body).toHaveProperty('token');//jwt token
        } catch (error) {
            console.log('err')
        }
    });

    it('should be able to access privete routes when authenticated', async () => {

        try {
            const user = await factory.create('User', {
                password: '123123'
            })
    
    
            const response = await request(app)
                .get('/dashboard')
                .set('Authorization', `Bearer ${user.genereteToken()}`)
    
    
            expect(response.status).toBe(200);//jwt authenticated token
        } catch (error) {
            console.log('');
        }

    });

    it('should not be able to access privete routes when not  token ', async () => {
        const response = await request(app).get('/dashboard')
        expect(response.status).toBe(401);//jwt not authenticated token
    });

    it('should not be able to access privete routes with invalid token', async () => {
        const response = await request(app)
        .get('/dashboard')
        .set('Authorization', `Bearer 123132`)

        expect(response.status).toBe(401);//jwt not authenticated token
    });
});

