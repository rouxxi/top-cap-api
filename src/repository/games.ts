import {DatabaseService} from '../services/database.ts';

interface CurrentGame {
    id: string;
    status: string;
    game_mod: string;
    grid: [number, number][];
    active_team: number | null;
    created_at: Date | null;
}

interface CurrentGameUpdateProps {
    id?: string;
    status?: string;
    game_mod?: string;
    grid?: [number, number][];
    active_team?: number | null;
}

async function getById (id: string) {
    const db = await DatabaseService.connect();
    const {data, error} = await db
        .from('games')
        .select(`
            *,
            pawns (
                id,
                position_x,
                position_y,
                team_id
            ),
            kings (
                id,
                position_x,
                position_y,
                team_id
            ),
            teams (
                 id,
                 name,
                 selected,
                 pawns_skin,
                 user_id
            )
        `)
        .eq('id', id);

    if( error) {
        console.log('error ',error)
        return null;
    }

    return data;
}

async function update (fieds: CurrentGameUpdateProps ) {
    const {id, ...others} = fieds
    const db = await DatabaseService.connect();
    const { data, error } = await db
        .from('games')
        .update({ ...others })
        .eq('id', id)
        .select('*');

    if( error) {
        console.log('error ',error)
        return null;
    }

    return data;
}

async function create (fieds: CurrentGameUpdateProps ) {
    const db = await DatabaseService.connect();
    const { data, error } = await db
        .from('games')
        .insert({...fieds})
        .select()

    if( error) {
        console.log('error ',error)
        return null;
    }

    return data;
}

async function deleteFromId (id: string ) {
    const db = await DatabaseService.connect();
    const { data, error } = await db
        .from('games')
        .delete()
        .eq('id', id);

    if( error) {
        console.log('error ',error)
        return null;
    }

    return data;
}

async function get (id: string) {
    const db = await DatabaseService.connect();
    const {data, error} = await db
        .from('games')
        .select(`
            *,
            pawns (
                id,
                position_x,
                position_y,
                player_id
            ),
            kings (
                id,
                position_x,
                position_y,
                player_id
            )
        `)
        .eq('id', id);

    if( error) {
        console.log('error ',error)
        return null;
    }

    return data;
}

export  { getById, update, create, deleteFromId }