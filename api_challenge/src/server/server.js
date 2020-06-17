const express = require('express');
const rp = require('request-promise');
const cors = require('cors');

const app = express();
app.use(cors());
const client_id = "5bd5840e2b374f4fa063880843bed812";
const client_secret = "Wt9Y6Nx8NacYbM1fuzWUqFoqz6qMqOVB";
const patient_id = "15430d7bfb5e";
const root_api = `https://api.1up.health`;
const fhir_api = `https://api.1up.health/fhir`

app.get('/', (req, res) => {
    res.send('Loading data . . .');
});

app.get('/everything', (req, res) => {
    let auth = req.get('Authorization');
    res.set('Content-Type', 'application/json');
    rp({
        url: `${fhir_api}/dstu2/Patient/${patient_id}/$everything`,
        method: 'get',
        headers: {
            'Authorization': auth
        }
    }).then(response => {
        console.log(response);
        res.send(response);
    }).catch(err => {
        console.log(err.message);
        res.send(err.message);
    })
});

app.get('/users', (req, res) => {
    const user_api = `https://api.1up.health/user-management/v1/user?client_id=${encodeURIComponent(client_id)}&client_secret=${encodeURIComponent(client_secret)}`;
    let auth = req.get('Authorization');
    res.setHeader('Content-Type', 'application/json');
    rp({
        method: 'get',
        url: user_api,
        headers: {
            'Authorization': auth
        }
    }).then(response => {
        res.send(response);
    }).catch(err => {
        console.log(err.message);
        res.send(err.message);
    })

});

app.listen(3000, () => {
    console.log('Server is now listening on port 3000 . . .');
})