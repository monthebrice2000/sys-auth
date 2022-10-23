import pg from "pg";
import oidc from "express-openid-connect";
const { auth, requiresAuth } = oidc;
import express from "express";
import path from "path";
import cors from "cors";
import axios from "axios";
import jwt from "jsonwebtoken";
import cookierSession from "cookie-session";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

// Creating express instance and save it to app variable
const app = express();
let client = null;

passport.use(
  new Strategy(
    {
      secretOrKey: "airforce#",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      await connectDB().catch((error) => done(null, false));
      await readDB(payload.subject.email, payload.subject.password, client)
        .then((success) => {
          done(null, {
            email: payload.subject.email,
            password: payload.subject.password,
          });
        })
        .catch((error) => done(null, false));
      await client.end();
    }
  )
);

// Setup the app to serve static files
app.use(express.static(path.join("./public")));
app.use(passport.initialize());
app.set("views", path.join("./public/views"));
app.set("view engine", "ejs");
app.use(express.json({ extended: true, limit: "1mb" }));
//add other middleware
app.use(cors());
app.use(
  cookierSession({
    httpOnly: true,
    keys: "test",
    name: "tokenn",
    signed: true,
    secret: "test",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(morgan('dev'));

/*
app.get("/callback", async (req, res, next) => {
  if (req.query.code) next();
  else res.status(302).redirect("/profile");
});

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    secret: process.env.SECRET,
    clientSecret: process.env.SECRET,
    idpLogout: true,
    routes: {
      postLogoutRedirect: process.env.BASE_URL,
    },
    authorizationParams: {
      response_type: "code",
      scope: "openid email profile",
      audience: process.env.AUDIENCE,
      redirect_uri: process.env.REDIRECT_URI,
    },
    logoutParams: {},
  })
);

app.get("/profile", requiresAuth(), async (req, res) => {
  res.render("profile", { user: req.oidc.user });
});

app.get("/", async (req, res) => {
  res.render("main", { user: req.oidc?.user });
});
*/

//app.set('set',true)
app.post("/registration", async (req, res) => {
  //console.log( req.body )
  const { email, password } = req.body;
  //console.log(req.body);
  await connectDB().catch((error) =>
    res.status(404).json({ message: "Cannot connect application" })
  );
  //console.log( client )
  await insertDB(email, password, client)
    .then((success) => res.status(200).json({ email, password }))
    .catch((error) =>
      res.status(404).json({ message: error.message || "Cannot register user" })
    );
  await client.end();
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //console.log( req.body )
  await connectDB().catch((error) => res.status(404).json({ email, password }));
  //console.log( client )
  await readDB(email, password, client)
    .then((success) => {
      let payload = { subject: { email, password } };
      let token = jwt.sign(payload, "airforce#");
      res
        .status(StatusCodes.OK)
        .cookie("token", token, { httpOnly: true })
        .json({
          email,
          password,
          message: getReasonPhrase(StatusCodes.OK),
          token,
        });
    })
    .catch((error) =>
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: error.message,
        msg: getReasonPhrase(StatusCodes.UNAUTHORIZED),
      })
    );
  await client.end();
});

app.get(
  "/events",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log(req.user);
    if (!req.user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
    }
    const { email, password } = req.user;
    axios
      .get("https://zoo-animal-api.herokuapp.com/animals/rand/7", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        res.status(StatusCodes.OK).json({ data: response.data });
      })
      .catch((err) =>
        res.status(StatusCodes.BAD_REQUEST).json({
          msg: err.message,
          message: getReasonPhrase(StatusCodes.BAD_REQUEST),
        })
      );
  }
);

app.get(
  "/special-events",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log(req.user);
    if (!req.user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
    }
    const { email, password } = req.user;
    axios
      .get("https://zoo-animal-api.herokuapp.com/animals/rand/5", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        res.status(StatusCodes.OK).json({ data: response.data });
      })
      .catch((err) =>
        res.status(StatusCodes.BAD_REQUEST).json({
          msg: err.message,
          message: getReasonPhrase(StatusCodes.BAD_REQUEST),
        })
      );
  }
);

app.get("/config/:file_name", async (req, res) => {
  let file_name = null;
  try {
    file_name = req.params.file_name;

    res.sendFile(file_name, { root: "./config" }, (err, test, data) => {
      if (err) {
        const e = new Error("no such file or directory,");
        e.message = "no such file or directory,";
        e.statusCode = 404;
        res.send("File Not Found" || e.message);
      }
    });
  } catch (e) {
    res.json({
      statusCode: 404 || e.statusCode,
      message: "File Not Found" || e.message,
    });
  }
});

app.use((req, res, next) => {
  res.render("404");
});

// Setup our express server with env port
let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is running on port ${port} `);
  //connectDB();
});

const connectDB = async () => {
  try {
    client = new pg.Client({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
      ssl: process.env.PGSSL,
      connectionTimeoutMillis: 0,
    });

    /*client = new pg.Client({
      user: process.env.PGUSER2,
      host: process.env.PGHOST2,
      database: process.env.PGDATABASE2,
      password: process.env.PGPASSWORD2,
      port: process.env.PGPORT2,
      connectionTimeoutMillis: 0,
    });*/

    await client
      .connect()
      .then((data) => console.log("connect successfully"))
      .catch((err) => {
        throw new Error("Connection Error");
      });
  } catch (error) {
    client = null;
    console.log("+++++++", error);
    throw new Error(error.message || "Error Message");
  }
  return client;
};

const insertDB = async (email, password, client) => {
  if (!client) return null;
  try {
    const res = await client.query(
      `INSERT INTO dept(email, password) VALUES ( '${email}', '${password}' )`
    );
    //await client.end()
    console.log(res.rows);
    return res;
  } catch (error) {
    //console.log("++++++++++")
    console.log(error);
    throw new Error(error.message || "Error Message");
  }
};

const readDB = async (email, password, client) => {
  if (!client) return null;
  try {
    const res = await client.query(
      `SELECT * FROM dept WHERE password='${password}' AND ( email='${email}' )`
    );
    //await client.end()
    console.log(res.rows);
    if (res.rows && res.rows.length !== 0) {
      return res[0];
    } else {
      throw new Error("User Not Found");
    }
    return res;
  } catch (error) {
    //console.log("++++++++++")
    console.log(error);
    throw new Error(error.message || "Error Message");
  }
};
