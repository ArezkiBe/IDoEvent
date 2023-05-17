import { NextFunction } from 'express';
import mongoose from 'mongoose';
import geocoder from "../utils/geocoder"
 
const etablissementSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        addressNumber: {
           type: Number,
           required: true
        },
        addressName:{
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required:true
        },
    },

    email:{
        type: String,
        required: true,
        unique: true
    },
   
    phone:{
        type: String,
        required: true
    },
    maxCapacity : {
        type : String,
        require : false,
        default: 0
    },
    description : {
        type : String,
        require : false,
        default:""
    },
    theme : {
        type : Array,
        require : false,

    },
    image : {
        type : Array,
        require : false,

    },
    location: {
        longitudes : Number,
        latitudes : Number,
        formatAdresse : String,
    },
    distance: {
        type: Number,
        default : 0

    },
    createdDate : {
        type : Date,
        default : Date.now
     }

});
//convert adress to gps location
etablissementSchema.pre('save',async function() {
    const adress= this.address?.addressNumber+" "+this.address?.addressName+" "+this.address?.postalCode
    const locations = await geocoder.geocode(adress);
    this.location = {
        longitudes : locations[0].longitude,
        latitudes : locations[0].latitude,
        formatAdresse : locations[0].formattedAddress
    }
    // not save adress in bd
    //this.address = "";
});

const etablissement_model =mongoose.model('etablissements', etablissementSchema);
export default etablissement_model;