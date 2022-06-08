const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();

const CameraModel = require('./models/Camera');

app.use(express.json())
app.use(cors())


mongoose.connect("mongodb+srv://user1:user1@cluster1.t30up.mongodb.net/camera?retryWrites=true&w=majority", {
    useNewUrlParser: true,
})

// insert data
app.post('/insert', async(req, res) => {
    const cameraName = req.body.cameraName;
    const cameraPrice = req.body.cameraPrice;
    const camera = CameraModel({ cameraName: cameraName, cameraPrice: cameraPrice })

    try {
        await camera.save()
        res.send('Data Inserted')
    } catch (err) {
        console.log(err);
    }
})


app.get('/read', async(req, res) => {
    CameraModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }
        res.send(result)
    })
})




app.listen(3002, () => {
    console.log('Server Running at PORT 3002')
})