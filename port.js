const ports  = require('./config/ports.json')
const Port   = require('./database/models/Port')
const status = require('./config/status.json')
const utils  = require('../../utils')

/*
    find port in MongoDB with the name specified in portName
    if no port is found with the specified name, 
        - create a new port with that name specified
        - populate the port with the data from ./config/ports.json for that port
*/
function getPort(portName) {
    if(utils.nullOrUndefined(portName) === false) {
        return new Promise((resolve, reject) => {
            Port.findOne({name: portName})
                .then(result => {
                    if(result === null || result === undefined) {
                        resolve(createPort(portName))
                    }
                    resolve(result)
                })
        })
    } else {
        return new Error('Invalid Port name provided')
    }
    
}


/*
    create a new Port
*/
function createPort(portName) {
    if(utils.nullOrUndefined(portName) === false) {
        try {
            const port = new Port(eval(`ports.${portName}`))
            port.save()
            
            return port

        } catch(error) {
            return new Error(error)
        }
    } else {
        return new Error('Invalid Port name provided')
    }
}

/*
    find the port in MongoDB with a matching id 
    update the shipping_movements for the port with blank arrays
    return the updated port from MongoDB
*/
function deleteShippingMovementsFromPort(port) {
    if(utils.nullOrUndefined(port) === false) {
        return new Promise((resolve, reject) => {
            Port.findOneAndUpdate({_id: port._id}, { shipping_movements: { expected: [], berth: [], history: [] } })
                .then(() => {
                    Port.findOne({_id: port._id})
                        .then(_port => {
                            resolve(_port)
                        }) 
                })
        })
    } else {
        return new Error('Port cannot be null or undefined')
    }
}


function addShippingMovementsToPort(port, status, shipsJSON) {

    if(port && status && shipsJSON) {
        let shippingMovements = port.shipping_movements
        
        // for each shipping movement record in 
        for (var sm in shipsJSON) {
            eval(`shippingMovements.${status}`).push(shipsJSON[sm])
        }

       // add sm as expected above - fails in this promise ++++
        return new Promise((resolve, reject) => {
            Port.findOneAndUpdate({_id: port._id}, { shipping_movements: { ...shippingMovements, updatedAt: Date.now() } })
                .then(() => {
                    Port.findOne({_id: port._id})
                        .then(_port => {
                            resolve(_port)
                        }) 
                })
        })
    } else {
        return new Error('port, status and shipsJSON are required')
    }
}

module.exports = {  
    getPort                         : getPort,
    createPort                      : createPort,
    deleteShippingMovementsFromPort : deleteShippingMovementsFromPort,
    addShippingMovementsToPort      : addShippingMovementsToPort
}
