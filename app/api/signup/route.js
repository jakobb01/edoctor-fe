import {v4 as uuidv4} from "uuid";
import sqlPool from "@/app/config/dbConfig";

export default async function handler(req, res) {
    console.log(req);
    // Validate form fields
    const username = req.username;
    const email = req.email;
    const password = req.password;



    const success =  username.length > 0 && email.length > 0 && password.length > 3;
    // generate uuid
    const id = uuidv4();
    if (success) {
        try {
            console.log('TRYING')
            const result = await sqlPool.query(`INSERT INTO "User" (uuid, username, email, password) VALUES (${id}, ${username}, ${email}, ${password});`);
            res.status(200).json(result.rows);
        } catch (error) {
            console.log('TOLE JE SLO NAROBE: ', error);
            res.status(500).json({ error: 'Internal Server Error'});
        }
    } else {
        res.status(404).json({error: 'Vnesi pravilne podatke!'})
    }
}