import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import { Candidate } from './models/candidates';

const app = express()

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ 
        message: 'Hello World!'
    })
})

router.get('/candidates', async (req, res) => {
    const candidates = await Candidate.findAll()

    return res.status(200).json(candidates)
})

app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`)
)