import express from 'express';

const app = express()
const port = 3000;

app.get('/', (_, res) => {
    res.send('wwamp!')
});
  
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});