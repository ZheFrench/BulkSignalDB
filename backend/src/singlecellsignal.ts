import "reflect-metadata";
import { createConnection, getManager,getRepository ,getConnectionOptions } from 'typeorm';
import express from "express";
import { Request, Response } from "express";
import { createExpressServer } from 'routing-controllers';
import { getReleases } from "./controllers/ReleaseController.js";
import releaseRouter from "./router/ReleaseRouter.js"
import history from "connect-history-api-fallback"
import {Release} from "./entities/Release.js";
import {Component} from "./entities/Component.js";
import {Interaction} from "./entities/Interaction.js";
import {Interactor} from "./entities/Interactor.js";


const connectionOptions = await getConnectionOptions();

Object.assign(connectionOptions, { entities: [Release,Component,Interaction,Interactor] });

createConnection(connectionOptions).then(async connection => {

    console.log("We are connected to Database !");
    console.log(await getConnectionOptions());
 
    // create and setup express app
    const app = express();

    app.use(releaseRouter)
    app.use(history());

    app.listen(3001);

}).catch(error => console.log("TypeORM connection error: ", error));

