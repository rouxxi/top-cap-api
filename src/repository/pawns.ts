import {DatabaseService} from '../services/database.ts';

interface Pawn {
    id?: number;
    position_x?: number;
    position_y?: number;
    skin?: string;
    team_id?: number;
    game_id?: number;
    created_at?: Date | null;
}

async function getById (id: number) {
    const db = await DatabaseService.connect();
    let { data, error } = await db
        .from('pawns')
        .select('*')
        .eq('id', id)

    if( error) {
        console.log('error ',error)
        return null;
    }

    return data;
}

async function update (fields: Pawn ) {
    const {id, ...others} = fields
    const db = await DatabaseService.connect();
    const { data, error } = await db
        .from('pawns')
        .update({ ...others })
        .eq('id', id)
        .select('*');

    if( error) {
        console.log('error ',error)
        return null;
    }

    return data;
}

async function create (fields: Pawn ) {
    const db = await DatabaseService.connect();
    const { data, error } = await db
        .from('pawns')
        .insert({...fields})
        .select()

    if( error) {
        console.log('error ',error)
        return null;
    }

    return data;
}

async function deleteFromId (id: number ) {
    const db = await DatabaseService.connect();
    const { data, error } = await db
        .from('pawns')
        .delete()
        .eq('id', id);

    if( error) {
        console.log('error ',error)
        return null;
    }

    return data;
}

export { getById, update, create, deleteFromId }