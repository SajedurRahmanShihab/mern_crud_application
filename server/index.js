const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()


const CameraModel = require('./models/CameraModel');

app.use(express.json())
app.use(cors())



mongoose.connect("mongodb+srv://user1:user1@cluster1.t30up.mongodb.net/camera?retryWrites=true&w=majority", {
    useNewUrlParser: true,
})


app.post('/insert', async(req, res) => {
    const cameraName = req.body.cameraName;
    const cameraPrice = req.body.cameraPrice;
    const camera = new CameraModel({
        cameraName: cameraName,
        cameraPrice: cameraPrice
    });
    try {
        await camera.save()
        res.send("Data Inserted");
    } catch (err) {
        console.log(err)
    }
})

app.put('/update', async(req, res) => {
    const newCameraName = req.body.newCameraName;
    const id = req.body.id;
    // console.log(newCameraName);

    try {
        await CameraModel.findById(id, (err, updatedCamera) => {
            updatedCamera.cameraName = newCameraName;
            updatedCamera.save();
            res.send("updated");
        });
    } catch (err) {
        console.log(err);
    }
});

app.delete("/delete/:id", async(req, res) => {
    const id = req.params.id;
    // res.send(id);

    await CameraModel.findByIdAndRemove(id).exec();
    res.send("deleted");
})



app.get('/read', async(req, res) => {
    CameraModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }
        res.send(result);
    })
})



app.listen(3002, () => {
    console.log("Server Running at PORT 3002")
})