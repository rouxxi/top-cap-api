import {createClient} from "@supabase/supabase-js";
import { ENV } from '../../config.ts';

export class DatabaseService {
    static async connect() {
        try {
            const databaseConnexion = createClient(ENV.DATABASE_URL, ENV.DATABASE_KEY)
            return databaseConnexion;
        } catch (error) {
            console.log(error)
        }
    }
}