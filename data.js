const https         = require('https')
const ports         = require('./config/ports.json')
const patterns      = require('./config/patterns').portOfTyne()
const statusMessage = require('./config/status')
const port          = require('./port')

// make HTTP request for data from source site - e.g. port of tyne
function getData(utils, port = null) {    
    try {
        if(port && statusMessage) {
            let url = eval(`ports.${port}.urls.movements`)
            if(url) {
                return utils.getRequest(https, url)
            } 
        } else {
            return new Error('port and status values are required - one for more was missing in portData.getData()')
        }
    } catch(error) {
        return error
    }
}


// parse the data collected from the source website
// convert the data into JSON
function parseData(utils, shippingMovementsPageData, status, shipNameFilter) {

    // remove line breaks from HTML response data
    let section = shippingMovementsPageData.replace(/(\r\n)+|\r+|\n+|\t+/g, ' ')
                                           .match(patterns[status]) // match the pattern specified within patterns.js to the HTML response data

    // tbody content
    let tableBody = utils.findPatternInString(patterns.tbody, section) 

    // table row content
    let rows = utils.findPatternInString(patterns.tr, tableBody)
 
    // keys map to the ShippingMovement schema properties
    const keys = ['ship_name',
                  'start',
                  'eta_etd',
                  'arr_move_sail',
                  'from',
                  'to',
                  'flag',
                  'order',
                  'imo',
                  'grt',
                  'agent',
                  'callsign',
                  'image']

    const shippingMovementsArray = populateShippingMovementsArray(utils, rows, keys, shipNameFilter)

    // if shippingMovementsArray contains items, return a JSON object of items, otherwise return a JSON object containing a status message
    const shipsJSON = shippingMovementsArray.length > 0 ? utils.convertArrayToJSON(keys, shippingMovementsArray) : `{"status": \"${statusMessage.NOT_FOUND}\"}`

    return shipsJSON
}

// loops through the table rows data and key values to produce an array of ShippingMovement content ready to be converted into JSON objects
function populateShippingMovementsArray(utils, rows, keys, shipNameFilter) {

    if(utils && rows.length > 0 && keys.length > 0)
    {
        let shippingMovements_Array = []

        // loop through each item in the rows Array
        rows.forEach(row => {

            // if 'keys' Array contains values
            if(keys.length > 0) {
                let values = []

                // loop through each item in the keys Array
                keys.forEach(key => {
                    values.push(constructShippingMovementsArrayItem(eval(`patterns.${key}`), utils, row))
                })

                // add the valu'es Array to the 'shippingMovements_Array' Array
                shippingMovements_Array.push(values)
            } 

        })
    
        // if a shipNameFilter is provided, filter the array to include only rows that contain the name specified, otherwise do not filter the array and return all ships   
        return shipNameFilter !== undefined ? shippingMovements_Array.filter(row => row[0].includes(utils.convertStringToUppercase(shipNameFilter))) : shippingMovements_Array 
    }

    return new Error('utils and table rows data must be provided')
}

// returns content for each table row by matching the pattern to the html table row content provided
// checks if the outcome of this if null or undefined 
// if not, the content is returned
// if the outcome is null or undefined and empty string is returned
function constructShippingMovementsArrayItem(pattern, utils, row) {
    if(pattern, utils, row) {
        return utils.nullOrUndefined(utils.findPatternInString(pattern, row)[0]) === false ? utils.findPatternInString(pattern, row)[0] : ''
    }

    return new Error('pattern, utils, row are all required')
}

// if shipsJSON contains JSON
// find the port in MongoDB with the name specifiec in portName
// if the port does not exist in the database, create a new Port
// call addShippingMovementsToPort
// return the port containing the new shipping movements
async function saveData(portName = null, _status = null, shipsJSON = null) {
    
    if(shipsJSON !== `{"status": "${statusMessage.NOT_FOUND}"}` && portName !== null) {
    
        let _port = null;

        try {
            _port = await port.getPort(portName)
                    await port.addShippingMovementsToPort(_port, _status, shipsJSON)
 
                    return _port
        } catch(error) {
            return new Error(error)
        }
        
    } else {
        return new Error(statusMessage.UNABLE_TO_SAVE_DATA)
    }
} 

module.exports = {  
    getData                             : getData,
    parseData                           : parseData,
    populateShippingMovementsArray      : populateShippingMovementsArray,
    constructShippingMovementsArrayItem : constructShippingMovementsArrayItem,
    saveData                            : saveData
}
