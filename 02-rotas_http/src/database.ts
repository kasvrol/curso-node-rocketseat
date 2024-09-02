import { knex as setupKnex, Knex } from "knex"

export const config: Knex.Config = {
    client: "sqlite",
    connection: {
        filename: "./db/data.db"
    },
    useNullAsDefault:true,
    migrations: {
        extension:'ts',
        directory:'./db/migrations'
    }
}

export const knex = setupKnex(config)