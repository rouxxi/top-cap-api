import * as gameRepository from "../../repository/games.ts";

interface CreateGameBody {
    preset:number;
    gameMod: string;
    teams: {
        name: string,
        pawnSkin:string
    }[]
}

export async function currentGame(id: string) {
    const [game] = await gameRepository.getById(id)
    return game;
}