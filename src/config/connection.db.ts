import 'dotenv/config'
import pg from 'pg'

const { Pool } = pg

//const connectionString = process.env.DATABASE_URL
const connectionString = "postgresql://postgres:mao9684@localhost:5432/codigoark"

export const db = new Pool({
    allowExitOnIdle: true,
    connectionString
})
