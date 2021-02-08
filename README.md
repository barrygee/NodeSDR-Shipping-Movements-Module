# Project: NodeSDR - Shipping Movements Module

<strong>Tech:</strong>  JavaScript (ES6), Node.js, Express.js, Mocha.js, Chai.js, MongoDB, Mongoose, HTML

<strong>Status:</strong> In development

<br>

## Overview

Shipping Movements Module for <a href="https://github.com/barrygee/NodeSDR">NodeSDR</a>

<br>

The module collects shipping movement data from a third party port website.  

The data is parsed and stored in a local MongoDB instance.

The module exposes APIs for the following functions:

- Get data from third party port website, parse and store the data.

- Get shipping movements data from local database for a specific port in JSON format.
    - Available filters include:
        - Status (expected, berth, history)
        - Ship name

- Get port specific data in JSON format including data URLs, Port Latitude / Longitude, Port specific radio frequencies.


## Setup

To add this module to NodeSDR:

- Clone the module source code from Github
    - `git clone ` 

    - Copy the cloned repository into the **NodeSDR > app > modules** directory

    - Require the shipping-movements module router in **NodeSDR > app > api > v1 > routers > router.js**  
        `const shippingMovementsModuleRouter = require('../../../modules/nodesdr-shipping-movements/router')`
        
    - Add a module router to **NodeSDR > app > api > v1 > routers > router.js**  
        `router.use('/shipping-movements', shippingMovementsModuleRouter.routes(utils))`


## Database

- The local database connection is handled by NodeSDR. See **NodeSDR > app > app.js**

- This module uses the **node-sdr** database defined by the NodeSDR application.

- This module creates and uses the module specific **ports** collection within the **node-sdr** database.

- Each time the API successfully collects shipping movements data from the third part port website, the data stored in the local database for the specified port is deleted and replaced with the newly collected data. 


## Testing

Unit tests can be run with the following command: `npm test`


## Dependencies

The module has the following dependencies:

- NodeSDR utils.js file
- MongooseJS
- ExpressJS

The dependencies detailed are used throughout the NodeSDR application and are installed by default by NodeSDR.  
The utils.js file is passed into the module via the module router within NodeSDR > app > app.js


## API

The module exposes the follwing APIs:

**Update the local database with shipping movements data**

- **Collect all shipping movements data for a specific port from a third party port website, parse and store the results**

    `http://localhost:1234/api/v1/shipping-movements/data/ports/:port`

    Example:

    `http://localhost:1234/api/v1/shipping-movements/data/ports/tyne`

<br> 

- **Collect shipping movements data filtered by ship name for a specific port from a third party port website, parse and store the results**

    `http://localhost:1234/api/v1/shipping-movements/data/ports/:port?ship_name=A Ship Name`

    Example:

    `http://localhost:1234/api/v1/shipping-movements/data/ports/tyne?ship_name=KING SEAWAYS`

<br>

**Return JSON formatted shipping movements data from the local database**


- **Return all shipping movements data for a specific port from the local database in JSON format**

    `http://localhost:1234/api/v1/shipping-movements/ports/:port`

    Example:

    `http://localhost:1234/api/v1/shipping-movements/ports/tyne`

<br> 

-  **Return JSON formatted shipping movements data filtered by ship name for a specific port from the local database**

    `http://localhost:1234/api/v1/shipping-movements/ports/:port?ship_name=A Ship Name`

    Example:

    `http://localhost:1234/api/v1/shipping-movements/ports/tyne?ship_name=KING SEAWAYS`

<br> 

-  **Return JSON formatted shipping movements data filtered by status for a specific port from the local database**

    `http://localhost:1234/api/v1/shipping-movements/ports/:port/:status(expected|berth|history)`

    Example:

    `http://localhost:1234/api/v1/shipping-movements/ports/tyne/expected`

<br>

-  **Return JSON formatted shipping movements data filtered by status and ship name for a specific port from the local database**

    `http://localhost:1234/api/v1/shipping-movements/ports/:port/:status(expected|berth|history)?ship_name=A Ship Name`

    Example:

    `http://localhost:1234/api/v1/shipping-movements/ports/tyne/expected?ship_name=KING SEAWAYS`

<br>


**Return JSON formatted port specific data including;**  
- **Port name**  
- **Data URLs**  
- **Location: latitude / longitude**  
- **Port specific radio frequencies**  

`http://localhost:1234/api/v1/shipping-movements/ports/`
