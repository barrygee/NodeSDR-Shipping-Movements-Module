const mongoose = require('mongoose')
const expect   = require('chai').expect
const Port     = require('../database/models/Port')
const portData = require('./data/port.json')
const config   = require(process.argv[4])

describe('Ports database (db_ports.js)', () => {

    let port
    
    // connect to the database
    before((done) => {
        mongoose.connect(config.database.protocol + config.database.host + '/' + config.database.test.name, config.database.config)
        
        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error'))
        db.once('open', done())
    })

    // delete the ports collection before each test
    beforeEach((done) => {
        mongoose.connection.collections.ports.drop(() => {
            port = new Port(portData)
            port.save()
            .then((port) => done())
        })
    })

    it('should confirm that a record with the specified name exists in the database collection', () => {
        Port.countDocuments({name: port.name})
            .then(numberOfMatchingRecordsInCollection => expect(numberOfMatchingRecordsInCollection).to.equal(1))
    })

    it('should find zero matching records in the database collection', () => {
        Port.countDocuments({name: 'does not exist'})
            .then(numberOfMatchingRecordsInCollection => expect(numberOfMatchingRecordsInCollection).to.equal(0))
    })
})