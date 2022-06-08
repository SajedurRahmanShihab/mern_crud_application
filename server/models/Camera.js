const mongoose = require('mongoose')


const CameraSchema = new mongoose.Schema({
    cameraName: {
        type: String,
        required: true
    },
    cameraPrice: {
        type: Number,
        required: true
    }
})

const Camera = mongoose.model("cameraInfo", CameraSchema);
module.exports = Camera;