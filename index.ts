import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import * as gameRepository from "./src/repository/games.ts";
import * as pawnsRepository from './src/repository/pawns.ts';
import * as teamsRepository from './src/repository/teams.ts';
import {createNewGame} from "./src/domain/usecases/createNewGame.ts";
import {currentGame} from "./src/domain/usecases/currentGame.ts";
import { ENV } from './config.ts';

const app = express();
const port = ENV.API_PORT;
const whiteList = ['https://topcapwebapp-4d789jve.b4a.run', 'http://localhost:5173', 'https://top-cap.netlify.app' ];
app.use(cors({
    methods: ['GET', 'PUT', 'POST'],
    allowedHeaders: ['Content-Type', 'Accept', "Access-Control-Allow-Origin"],
    origin: whiteList,
}))

app.use(bodyParser.json());

app.get('/games', async (req, res) => {
    try {
        const { id } = req.query
        if (!id) {
            res.status(400).json({ message:"No ID sended"})
            return;
        }
        // @ts-ignore
        const data = await currentGame(id);
        if (!data) {
            res.status(404).json({ message:'Not found'})
            return;
        }
         res.setHeader('Content-Type', 'application/json');
         res.status(200).json(data);
         return;
    } catch (error) {
        res.status(500).json( error);
    }
});


app.post('/games', async (req, res) => {
    try {
        const payload = req.body;
        if (payload) {
            const gameId = await createNewGame(payload);
            res.status(201).json({id: gameId});
            return;
        } else {
            res.status(400).json({ message:'Not Created'});
            return;
        }
    } catch (error) {
        console.error(error);
        res.status(500);
    }
});

app.put('/games', async (req, res) => {
    try {
        const payload = req.body;
        if (payload) {
            const game = await gameRepository.update(payload);
            res.status(200).json(game);
        } else {
            res.status(404).json({ message:'NotFound'});
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

app.put('/pawns', async (req, res) => {
    try {
        const payload = req.body;
        if (payload) {
            const pawn = await pawnsRepository.update(payload);
            res.status(200).json(pawn);
        } else {
            res.status(404).json({ message:'NotFound'});
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

app.put('/teams', async (req, res) => {
    try {
        const payload = req.body;
        if (payload) {
            const team = await teamsRepository.update(payload);
            res.status(200).json(team);
        } else {
            res.status(404).json({ message:'NotFound'});
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})