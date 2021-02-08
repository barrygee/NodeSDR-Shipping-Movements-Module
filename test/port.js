const chai                          = require('chai')
const expect                        = require('chai').expect
const chaiAsPromised                = require('chai-as-promised')
const port                          = require('../port')
const PortModel                     = require('../database/models/Port')
const portJSON                      = require('./data/port.json')
const utils                         = require('../../../utils')
const data                          = require('../data')

chai.use(chaiAsPromised)

describe('Create a Port, Get a port, Delete shipping movements from a port, Add shipping movements to a port (port.js)', () => {

    describe('getPort()', () => {

        it('should return a Promise', async () => {
            expect(port.getPort('tyne')).to.be.instanceOf(Promise)    
        })

        it('should eventually return a Port when the port name is provided', async () => {
            const p = await port.getPort('tyne')
            expect(p).to.have.property('name')
        })
    
        it('should eventually return an Error when no Port is found in the database with the name provided', async () => {
            const p = await port.getPort('INVALID PORT NAME')
            expect(p).to.be.instanceOf(Error)
        })
    
        it('should eventually return an Error when no Port name is provided', async () => {
            const p = await port.getPort()
            expect(p).to.be.instanceOf(Error).with.property('message', 'Invalid Port name provided')
        })
    })

    describe('createPort()', () => {
        
        it('should return an Error when no Port name is provided', async () => {
            const p = await port.createPort()
            expect(p).to.be.instanceOf(Error).with.property('message', 'Invalid Port name provided')
        })

        it('should return an Error when no Port is found in the database with the name provided', async () => {
            const p = await port.createPort('INVALID PORT NAME')
            expect(p).to.be.instanceOf(Error)
        })

        it('should return an Error when no Port name is provided', async () => {
            const p = await port.createPort()
            expect(p).to.be.instanceOf(Error).with.property('message', 'Invalid Port name provided')
        })

        it('should return a new Port object containing the values from config/ports.json for the provided port name', async () => {
            const p = await port.createPort('sunderland')
            expect(p).to.be.instanceOf(PortModel).with.property('name', 'sunderland')
        })
    })

    describe('deleteShippingMovementsFromPort()', () => {

        it('should return a Promise', async () => {
            expect(port.deleteShippingMovementsFromPort({})).to.be.instanceOf(Promise)    
        })

        it('should return an Error when no Port is provided', async () => {
            const p = await port.deleteShippingMovementsFromPort()
            expect(p).to.be.instanceOf(Error).with.property('message', 'Port cannot be null or undefined')
        })
    })

    describe('addShippingMovementsToPort()', () => {

        it('should return a Promise', async () => {
            expect(port.addShippingMovementsToPort({}, "status", {})).to.be.instanceOf(Promise)    
        })
  
        it('should return an Error when all required values are not provided', async () => {
            const p = await port.addShippingMovementsToPort()
            expect(p).to.be.instanceOf(Error).with.property('message', 'port, status and shipsJSON are required')
        })

        it('should return an Error when \'port\' is not provided', async () => {
            const p = await port.addShippingMovementsToPort(null, "expected", {})
            expect(p).to.be.instanceOf(Error).with.property('message', 'port, status and shipsJSON are required')
        })

        it('should return an Error when \'status\' is not provided', async () => {
            const p = await port.addShippingMovementsToPort({_id: '5c9dfdd10bad151a32182191'}, null, {})
            expect(p).to.be.instanceOf(Error).with.property('message', 'port, status and shipsJSON are required')
        })

        it('should return an Error when \'shipsJSON\' is not provided', async () => {
            const p = await port.addShippingMovementsToPort({_id: '5c9dfdd10bad151a32182191'}, "expected")
            expect(p).to.be.instanceOf(Error).with.property('message', 'port, status and shipsJSON are required')
        })
    })
})