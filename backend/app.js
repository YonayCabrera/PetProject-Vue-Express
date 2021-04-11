const express = require('express');
const fs = require('fs');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));


app.get('/favouriteUsers', (req, res) => {
    var users = readFile('./users.txt');
    var favouriteUsers = users.filter(u => u.favorite == true)
    res.json(favouriteUsers);
});

app.put('/users', (req, res) => {
    var user = req.body;
    var users = readFile('./users.txt');
    if(users.find(u => u.login.uuid == user.login.uuid)) {
        let otherUsers = users.filter(u => u.login.uuid != user.login.uuid)
        otherUsers.push(user)
        fs.writeFileSync('./users.txt', JSON.stringify(otherUsers));
    }else {
        users.push(user);
        fs.writeFileSync('./users.txt', JSON.stringify(users));
    }
    return res.json({ msg: 'success' });
});

app.get('/users', (req, res) => {
    var users = readFile('./users.txt');
    res.json(users);
});

app.get('/users/:uuid', (req, res) => {
    var users = readFile('./users.txt');
    var user = users.filter(user => user.login.uuid == req.params.uuid)[0]
    res.json(user);
});

app.post('/users', (req, res) => {
    var user = req.body;
    var users = readFile('./users.txt');
    if(users && users.length > 0) {
        return;
    }else {
        fs.writeFileSync('./users.txt', JSON.stringify(user));
     }
});


app.listen(5000, (error) => {
    console.log("servidor escuchando en puerto 5000")
})

function readFile(file) {
    var fileReaded = fs.readFileSync(file, 'utf8')
    if(fileReaded == '') {
        return [];
    }
    return JSON.parse(fileReaded)
}