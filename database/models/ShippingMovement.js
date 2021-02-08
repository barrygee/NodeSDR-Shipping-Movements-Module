const mongoose = require('mongoose')
const Schema   = mongoose.Schema

// create schema and model
const ShippingMovementSchema = new Schema({
    ship_name	  : String,
	start		  : String,
	eta_etd		  : String,
	arr_move_sail : String,
	from		  : String,
	to			  : String,
	flag		  : String,
	order		  : String,
	imo			  : String,
	grt			  : String,
	agent		  : String,
	callsign	  : String,
	image		  : String
})

const ShippingMovement = mongoose.model('shippingmovement', ShippingMovementSchema, 'shipping-movements')

module.exports = {
	ShippingMovement: ShippingMovement,
	ShippingMovementSchema: ShippingMovementSchema 
}