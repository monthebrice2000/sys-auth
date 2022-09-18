//import  dotenv from "dotenv";
//import  pg from "pg";
import jquery from "jquery";

import pg from "pg";

/*let connectDb = async () => {
    try {
        const client = new pg.Client({
            user: 'monthedjeumoubrice2000',
            host: 'db.bit.io',
            database: 'monthedjeumoubrice2000/Users',
            password: 'v2_3uB8N_9kGEykC9hBtAF6hGFckCCp4',
            port: '5432'
        });

        console.log( client );
        await client.connect()
        const res = await client.query('SELECT * FROM dept')
        console.log(res)
        await client.end()
    } catch (error) {
        console.log(error)
    }
}*/

// Requiring Express from node modules
import express from "express";

// Requiring Path from node modules
import path from "path";

// @ADD this, to require dotenv and configure it
import dotenv from "dotenv";
const dotenvConfig = dotenv.config();

// Creating express instance and save it to app variable
const app = express()
let client = null;

// Setup the app to serve static files
app.use(express.static(path.join('./public')))
app.use( express.json({ extended: true, limit: '1mb' }));

app.post( "/registration", async (req, res) => {
    //console.log( req.body )
    const { username, email, password } = req.body;
    //console.log( req.body )
    connectDB().catch( error => res.status(404).json( { username, email, password } )  );
    console.log( client )
    insertDB( username, email, password , client )
        .then( success => res.status(200).json( { username, email, password } ) )
        .catch( error => res.status(404).json( { username, email, password } ));
    await client.end()
})

app.post( "/login", async (req, res) => {
    //console.log( req.body )
    const {  email, password } = req.body;
    //console.log( req.body )
    connectDB().catch( error => res.status(404).json( { email, password } )  );
    console.log( client )
    readDB( email, password , client )
        .then( success => res.status(200).json( {email, password } ) )
        .catch( error => res.status(404).json( { email, password } ));
    await client.end()
})

// Setup our express server with env port
let port = process.env.PORT || 5000 ;
app.listen(port, ()=>{
    console.log(`App is running on port 5000 `);
    //connectDB();
})

const connectDB = async (  ) => {

    try {
        client = new pg.Pool( {
            user: "monthedjeumoubrice2000",
            host: "db.bit.io",
            database: "monthedjeumoubrice2000/Users",
            password: "v2_3uB8N_9kGEykC9hBtAF6hGFckCCp4",
            port: "5432",
            ssl: true,
            idleTimeoutMillis: 0,
            connectionTimeoutMillis: 200000,
        } );

        await client.connect().then( data => console.log( "connect successfully"));
    }catch( error ){
        client = null;
        console.log( error );
        throw new Error("Error Message");
    }
    return client;
}

const insertDB = async ( username, email, password, client ) => {
    if( !client )
        return null;
    try{
        const res = await client.query(`INSERT INTO dept(name, email, password) VALUES ( '${username}', '${email}', '${password}' )`);
        //await client.end()
        console.log( res.rows );
        return res;
    }catch( error ){
        //console.log("++++++++++")
        console.log( error );
        throw new Error("Error Message")
    }

}

const readDB = async ( email, password, client ) => {
    if( !client )
        return null;
    try{
        const res = await client.query(`SELECT * FROM dept WHERE password='${password}' AND ( name='${email}' OR email='${email}' )`);
        //await client.end()
        console.log( res.rows );
        if( res.rows && res.rows.length !== 0 ){
            return res;
        }else{
            throw new Error("No Users");
        }
        return res;
    }catch( error ){
        //console.log("++++++++++")
        console.log( error );
        throw new Error( error.message || "Error Message")
    }

}


