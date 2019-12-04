const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 3000;
//models
const Room = require('./model/Rooms');

//database - mongoose
mongoose.connect('mongodb://localhost:27017/Db_SDElective', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, });

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.set('useFindAndModify', false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/addRoom', (req, res) => {
    console.log(req.body)
    const data = new Room({
        name: req.body.name,
        records: [{
            openTime: req.body.openTime,
            closeTime: req.body.closeTime
        }]
    });
    data.save((err) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ data });
    });
});

app.put('/addRecord/:id', (req, res) => {
    const record = {
        openTime: req.body.openTime,
        closeTime: req.body.closeTime
    }
    Room.findByIdAndUpdate(req.params.id, { $push: { records: record } }, { new: true }, (err, data) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ message: 'Service is successfully updated', data })
    })
})

app.delete('/deleteRoom/:id', (req, res) => {
    Room.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ message: 'Service is successfully deleted', data })
    })
})

app.get('/retrieve', (req, res) => {
    Room.find({}, (err, data) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ message: 'Success', data })
    })
})

app.listen(PORT)
console.log('api running on port: ' + PORT)