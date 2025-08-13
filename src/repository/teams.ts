import {DatabaseService} from '../services/database.ts';

interface Team {
    id?: number;
    name: string;
    selected?: boolean;
    pawns_skin: string;
    game_id: string;
    user_id: string | null;
    created_at?: Date | null;
}

async function getById (id: number) {
    const db = await DatabaseService.connect();
    let { data, error } = await db
        .from('teams')
        .select('*')
        .eq('id', id)

    if( error) {
        console.log('error ',error)
        return null;
    }

    return data;
}

async function update (fields: Team ) {
    const {id, ...others} = fields
    console.log('field to update', fields)
    const db = await DatabaseService.connect();
    const { data, error } = await db
        .from('teams')
        .update({ ...others })
        .eq('id', id)
        .select('*');

    if( error) {
        console.log('error ',error)
        return null;
    }

    return data;
}

async function create (fieds: Team ) {
    const db = await DatabaseService.connect();
    const { data, error } = await db
        .from('teams')
        .insert({...fieds})
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
        .from('teams')
        .delete()
        .eq('id', id);

    if( error) {
        console.log('error ',error)
        return null;
    }

    return data;
}

export { getById, update, create, deleteFromId }