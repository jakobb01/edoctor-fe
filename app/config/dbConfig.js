import { Pool } from 'pg'
const connectionString = 'postgres://edoctor_postgresql_dev_user:kn5w1CCXdmwenZjxFySfhlHn0Th6kWdY@dpg-cp473kocmk4c73efaa8g-a.frankfurt-postgres.render.com/edoctor_postgresql_dev';

const sqlPool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = sqlPool;