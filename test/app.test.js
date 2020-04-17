const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app.js');
const playstore = require('../playstore');


describe('GET /', () => {
    it('should return "Hello Express!"', () => {
        return request(app)
            .get('/')
            .expect(200, 'Hello Express!');
    });
});

describe('GET /apps', () => {
    it('should get all apps in playstore with no filters', () => {
        return request(app)
            .get('/apps')
            .expect(200, playstore)
            .expect('Content-type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
            });
    });

    it('should return filtered playstore by rating', () => {
        return request(app)
            .get('/apps')
            .query({sort: 'rating'})
            .expect(200)
            .expect('Content-type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.deep.members(playstore)
            });
    });

    it('should return playstore sorted by app', () => {
        return request(app)
            .get('/apps')
            .query({sort: 'app'})
            .expect(200, playstore)
            .expect('Content-type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
            });
    });

    it('should return playstore filtered by action', () => {
        return request(app)
            .get('/apps')
            .query({genres: 'Action'})
            .expect(200)
            .expect('Content-type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                // expect(res.body).to.have.deep.members(playstore);
            });
    });

    it('should return playstore filtered by action and rating', () => {
        return request(app)
            .get('/apps')
            .query({sort: 'rating', genres: 'Action'})
            .expect(200)
            .expect('Content-type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                // expect(res.body).to.have.deep.members(playstore);
            });
    });
});