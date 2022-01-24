const express = require('express')
const app = express()
const indexRouter = require('./Routes/indexRouter')
const cors = require('cors')

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter)

app.listen(4444, () => {
    console.log("ok");
})
