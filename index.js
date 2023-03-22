const express = require('express')
const bodyParser = require('body-parser')
const client = require('./connection')
const format = require('pg-format')
const app = express()
app.use(bodyParser.json())

app.listen(8085, () => {
    console.log('api running on port 8085')
})

client.connect(err => {
    if(err) {
        console.log(err.message)
    } else {
        console.log('connected to database')
    }
})

app.get('/', (req, res) => {
    client.query(`select * from role`, (err, result) => {
        if(err) {
            res.send(err.message)
        } else {
            res.send(result.rows)
        }
    })
})

app.post('/', (req, res) => {
    const roles = req.body.roles.map(user => [
        user.name
    ])
    client.query(format(`insert into role(name) values %L returning id`, roles), (err, result) => {
        if(err) {
            res.send(err.message)
        } else {
            res.send(result.rows)
        }
    })
})

app.put('/', (req, res) => {
    for(role of req.body.roles) {
        client.query(`update role set name = '${role.name}' where id = ${role.id}`, (err, result) => {
            if(err) {
                console.log(err)
            }
        })
    }
    res.send('update success')
})