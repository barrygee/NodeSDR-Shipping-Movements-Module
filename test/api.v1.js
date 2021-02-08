const chai      = require('chai');
const expect    = require('chai').expect;
const chaiHttp  = require('chai-http');
const portsJSON = require('../config/ports.json');
const config   = require(process.argv[4])

chai.use(chaiHttp);

describe('API Version 1 (api.v1.js)', () => {

    describe('/api/v1/shipping-movements/ports/', () => {

        it('route \: \'/api/v1/shipping-movements/ports/\' should return HTTP status 200', (done) => {
            chai.request(`localhost:${config.server.port}`)
                .get('/api/v1/shipping-movements/ports')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it('route \: \'/api/v1/shipping-movements/ports/\' should return JSON', (done) => {
            chai.request(`localhost:${config.server.port}`)
                .get('/api/v1/shipping-movements/ports/')
                .end((err, res) => {
                    expect(res.body).to.eql(portsJSON);
                    done();
                });
        });
        
        it('route \: \'/api/v1/shipping-movements/ports/tyne\' should return HTTP status 200', (done) => {
            chai.request(`localhost:${config.server.port}`)
                .get('/api/v1/shipping-movements/ports/tyne')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it('route \: \'/api/v1/shipping-movements/ports/tyne/expected\' should return HTTP status 200', (done) => {
            chai.request(`localhost:${config.server.port}`)
                .get('/api/v1/shipping-movements/ports/tyne/expected')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it('route \: \'/api/v1/shipping-movements/ports/tyne/berth\' should return HTTP status 200', (done) => {
            chai.request(`localhost:${config.server.port}`)
                .get('/api/v1/shipping-movements/ports/tyne/berth')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it('route \: \'/api/v1/shipping-movements/ports/tyne/history\' should return HTTP status 200', (done) => {
            chai.request(`localhost:${config.server.port}`)
                .get('/api/v1/shipping-movements/ports/tyne/history')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });


        // should error - currently doesnt - test fails - code doesnt catch it - gets stuck
        it('route \: \'/api/v1/shipping-movements/ports/tyne/this-status-does-not-exist\' should return HTTP status 422', (done) => {
            chai.request(`localhost:${config.server.port}`)
                .get('/api/v1/shipping-movements/ports/tyne/this-status-does-not-exist')
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    done();
                });
        });
    });
});