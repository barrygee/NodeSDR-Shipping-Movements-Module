const express        = require('express')
const data           = require('./data')
const port           = require('./port')
const ports          = require('./config/ports.json')
const status         = require('./config/status.json')

function routes(utils) {

    const router = express.Router()

     // get all data from source url and store it in MongoDB
     router.get('/data/ports/:port', async (req, res) => {

        // sanitize req.params
        req.params = utils.sanitizeJSONObject(req.params)
    
        // delete all shipping movement records for the specified port
        await port.deleteShippingMovementsFromPort(await port.getPort(req.params.port))
    
        // make HTTP GET request to external web page 
        // shippingMovementsHTMLData === the web page HTML data response 
        const shippingMovementsHTMLData = await data.getData(utils, req.params.port)

        // for each status
        // parse data from webpage for teh specified port and status 
        // parse the collected webpage data and convert it into JSON
        // save the JSON data into a MongoDB database
        const statuses = ['expected', 'berth', 'history']
        for(let status of statuses) {
            const shipsJSON = await data.parseData(utils, shippingMovementsHTMLData, status, req.query.ship_name)
            await data.saveData(req.params.port, status, shipsJSON)
        }
        res.json({"status": status.SUCCESS})
    })

    router.get('/', (req, res) => {
        res.send('Shipping movements data')
    })

    /* 
        - Gets ports data ports.json
    */
    router.get('/ports', (req, res) => {
        res.json(ports)
    })
    
    /* 
        - Gets data from MongoDB
    
        status (optional)
        ship_name (optional)
    
        Examples:
            return data for the status specified: shipping-movements/[expected/berth/history]
            return data for the status specified with filtered results: shipping-movements/[expected/berth/history]?ship_name=SOME_SHIP_NAME_HERE
            return all data: shipping-movements
            return all data with filtered results: shipping-movements?ship_name=SOME_SHIP_NAME_HERE
    */
    router.get('/ports/:port/:status?', async (req, res) => {
       
        // sanitize req.params
        req.params = utils.sanitizeJSONObject(req.params)
    
        // get data from MongoDB for the specified port, port && status, port && status && ship_name
        let portData = {}
 
        try {
            portData = await port.getPort(req.params.port)
        } catch(error) {
            res.status('422').send({"status": error})
            return
        }
    
        let filteredPortData = null
        let statusParam = null

        if(req.params.status && req.query.ship_name) {
            statusParam= eval(`portData.shipping_movements.${req.params.status}`)

            if(statusParam !== undefined) {
                filteredPortData = statusParam.filter(data => data.ship_name.includes(utils.convertStringToUppercase(req.query.ship_name)))
            } else {
                res.status('422').send({"status": status.INVALID_PORT_STATUS})
            }
           } else if(req.params.status) {
               // check if status is invalid i.e. contains a '-'
               try {
                   statusParam = eval(`portData.shipping_movements.${req.params.status}`)
               } catch(error) {
                    res.status('422').send({"status": status.INVALID_PORT_STATUS})
               }
                
               // check if specified status was found for the specified port within the shipping_movements database collection
                if(statusParam !== undefined) {
                    filteredPortData = statusParam
                } else {
                    res.status('422').send({"status": status.INVALID_PORT_STATUS})
                }
        } else if(!req.params.status && req.query.ship_name) {
            const expected = portData.shipping_movements.expected.filter(data => data.ship_name.includes(utils.convertStringToUppercase(req.query.ship_name)))
            const berth = portData.shipping_movements.berth.filter(data => data.ship_name.includes(utils.convertStringToUppercase(req.query.ship_name)))
            const history = portData.shipping_movements.history.filter(data => data.ship_name.includes(utils.convertStringToUppercase(req.query.ship_name)))
            
            filteredPortData = { "expected": expected, 
                                 "berth": berth, 
                                 "history": history }
        } else {
            filteredPortData = eval(`portData.shipping_movements`)
        }
    
        if(filteredPortData) {
            res.json(filteredPortData)
        }
    })

    return router
}

module.exports = {  
    routes : routes
}