const ShippingMovementSchema = require('./ShippingMovement').ShippingMovementSchema
const mongoose               = require('mongoose')
const Schema                 = mongoose.Schema

const PortSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    location: {
        latitude: String,
        longitude: String
    },
    frequencies: {
        vts: String,
        tugs: String,
        operations: String,
        harbour: String
    },
    shipping_movements: { 
        expected: [ShippingMovementSchema],
        berth: [ShippingMovementSchema],
        history: [ShippingMovementSchema]
    }
})

const Port = mongoose.model('port', PortSchema, 'ports')

module.exports = Port
