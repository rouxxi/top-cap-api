import * as teamsRepository from "../../repository/teams.ts";
import * as gameRepository from "../../repository/games.ts";
import * as  kingRepository from "../../repository/kings.ts";
import * as pawnRepository from "../../repository/pawns.ts";
import {getPreset} from "../../utils/gridGenerator.ts";

interface CreateGameBody {
    preset:number;
    game_mod: string;
    teams: {
        name: string,
        pawns_skin:string
    }[]
}

export async function createNewGame(bodyRequest: CreateGameBody) {
    const preset = getPreset(bodyRequest.preset);

    const [game] = await gameRepository.create({
        status: 'created',
        game_mod: bodyRequest.game_mod,
        grid: preset.grid
    })

    for (const team of bodyRequest.teams) {
        const index = bodyRequest.teams.indexOf(team);

        const [teamCreated] = await teamsRepository.create({name: team.name, game_id: game.id, pawns_skin:team.pawns_skin, user_id: null})
        if (index === 0) {
            await gameRepository.update({
                id: game.id,
                active_team: teamCreated.id,
            })
        }

        await kingRepository.create({
            position_x: preset.teams[index].kingPosition[0],
            position_y: preset.teams[index].kingPosition[0],
            team_id: teamCreated.id,
            game_id: game.id,
        })

        for (const [x,y] of preset.teams[index].teamPawns) {
            await pawnRepository.create({
                position_x: x,
                position_y: y,
                team_id: teamCreated.id,
                game_id: game.id,
            })
        }
    }

    return game.id;
}