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
const port = 4201 // ENV.API_PORT;

app.use(cors())
app.use(bodyParser.json());

app.get('/games', async (req, res) => {
    try {
        const { id } = req.query
        if (!id) {
            res.status(400).json("No ID sended")
            return;
        }
        // @ts-ignore
        const data = await currentGame(id);
        if (!data) {
            res.status(404).json('Not found')
            return;
        }
         res.setHeader('Content-Type', 'application/json');
         res.status(200).json(data);
         return;
    } catch (error) {
        res.status(500).json( error.message);
    }
});


app.post('/games', async (req, res) => {
    try {
        const payload = req.body;
        if (payload) {
            const game = await createNewGame(payload);
            res.status(201).json(JSON.stringify(game));
            return;
        } else {
            res.status(400).json('Not Created');
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
            res.status(204).json(game);
        } else {
            res.status(404).json('NotFound');
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
});

app.put('/pawns', async (req, res) => {
    try {
        const payload = req.body;
        if (payload) {
            const pawn = await pawnsRepository.update(payload);
            res.status(204).json(pawn);
        } else {
            res.status(404).json('NotFound');
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
});

app.put('/teams', async (req, res) => {
    try {
        const payload = req.body;
        if (payload) {
            const pawn = await teamsRepository.update(payload);
            res.status(204).json(pawn);
        } else {
            res.status(404).json('NotFound');
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})