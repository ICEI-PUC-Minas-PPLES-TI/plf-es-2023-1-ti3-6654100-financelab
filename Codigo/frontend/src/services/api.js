

/*import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333'
})

export default api
*/

const express = require('express');
const app = express();
const axios = require ('axios')

app.use(express.json());


app.get('/dados',  async (request, response)  => {
  const { key } = request.query;
  const dados = await getDadosAPIExterna(key);
 return response.status(201).send(dados);
});

async function getDadosAPIExterna(key) {
  const result = await axios.get(`http://api.hgbrasil.com/finance?key=${key}`);
  return result.data;  
}


module.exports = app;