const express = require('express');
const app = express();
app.listen(3333); //hospeda o programa na porta 3333 no localhost

app.get('/', (request, response) => {
    return response.json({
        evento: 'Teste projeto TIACR',
        autor: 'Pedro Talma Toledo'
    });
})