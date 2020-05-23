const chai = require('chai')
const chaiHttp = require('chai-http')
const { app } = require('../app')

chai.should()
chai.use(chaiHttp)

describe('Alerts tests', () => {
    it('should list ALL alerts on /alerts GET', done => {
        chai
            .request(app)
            .get('/alerts')
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(200)
                res.should.be.json
                res
                    .body
                    .should
                    .be
                    .a('array')
                done()
            })
    })
    it('should list a SINGLE alert on /alerts/<id> GET', done => {
        chai
            .request(app)
            .get('/alerts/5730273a5-7b1a-11e8-9c9c-2d42b21b1a3e')
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(200)
                res.should.be.json
                res
                    .body
                    .should
                    .be
                    .a('object')
                res
                    .body
                    .should
                    .have
                    .property('id')
                res
                    .body
                    .id
                    .should
                    .equal('5730273a5-7b1a-11e8-9c9c-2d42b21b1a3e')
                done()
            })
    })

    it('should list an UNKNOW alert on /alerts/<id> GET', done => {
        chai
            .request(app)
            .get('/alerts/5730273a5-7b1a-11e8-9c9c-2d42b21b1a3e')
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(404)
                res.should.be.json
                done()
            })
    })

    it('should add a SINGLE alert on /alerts POST', done => {
        chai
            .request(app)
            .post('/alerts')
            .send({ name: 'Apache 2.0', type: 'weather', status: 'warning' })
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(201)
                res.should.be.json
                res
                    .body
                    .should
                    .be
                    .a('object')
                res
                    .body
                    .should
                    .have
                    .property('id')
                res
                    .body
                    .should
                    .have
                    .property('name')
                res
                    .body
                    .name
                    .should
                    .equal('Apache 2.0')
                res
                    .body
                    .should
                    .have
                    .property('status')
                res
                    .body
                    .age
                    .should
                    .equal('warning')
                res
                    .body
                    .should
                    .have
                    .property('type')
                res
                    .body
                    .login
                    .should
                    .equal('weather')
                done()
            })
    })

    it('should add a INVALID alert on /alerts POST', done => {
        chai
            .request(app)
            .post('/alerts')
            .send({ name: 'Apache 2.0', type: 'weather', status: 'warning', wrongparam: 'value' })
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(400)
                res.should.be.json
                done()
            })
    })

    it('should add an EMPTY alert on /alerts POST', done => {
        chai
            .request(app)
            .post('/alerts')
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(400)
                res.should.be.json
                done()
            })
    })

    it('should update a SINGLE alert on /alerts/<id> PATCH', done => {
        chai
            .request(app)
            .patch('/alerts/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
            .send({ name: 'Apache 2.0' })
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(200)
                res.should.be.json
                res
                    .body
                    .should
                    .be
                    .a('object')
                res
                    .body
                    .should
                    .have
                    .property('id')
                res
                    .body
                    .id
                    .should
                    .equal('45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
                res
                    .body
                    .name
                    .should
                    .equal('Apache 2.0')
                res
                    .body
                    .login
                    .should
                    .equal('Apache 1.0')
                done()
            })
    })

    it('should update a alert with wrong parameters on /alerts/<id> PATCH', done => {
        chai
            .request(app)
            .patch('/alerts/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
            .send({ wrongparam1: 'Apache 2.0' })
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(400)
                res.should.be.json
                done()
            })
    })

    it('should update a UNKNOW alert on /alerts/<id> PATCH', done => {
        chai
            .request(app)
            .patch('/alerts/45745c60-unknow-2d42b21b1a3e')
            .send({ name: 'Apache 2.0' })
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(404)
                res.should.be.json
                done()
            })
    })

    it('should delete a SINGLE alert on /alerts/<id> DELETE', done => {
        chai
            .request(app)
            .delete('/alerts/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(200)
                done()
            })
    })

    it('should delete a UNKNOWN alert on /alerts/<id> DELETE', done => {
        chai
            .request(app)
            .delete('/alerts/45745c60-unknown-2d42b21b1a3e')
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(404)
                done()
            })
    })

    it('should delete a NULL ID alert on /alerts/<id> DELETE', done => {
        chai
            .request(app)
            .delete('/alerts/')
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(404)
                done()
            })
    })
})