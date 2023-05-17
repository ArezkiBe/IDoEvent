import express from 'express';
import {Application} from 'express';
import {json} from 'body-parser';
import {router} from './router/routes';
import {connectToBDD} from './bd/mongoDB_connection';
import cors from 'cors';
import createServer from './utils/app';

const url: string= 'mongodb+srv://L3H2:projetlicence@idoevent.icahfwf.mongodb.net/ProjetL3H2'
const app= createServer();
const port: number = 5000;


//connexion à la BDD
connectToBDD(url)





app.listen(port, () =>{
    console.log(`Le serveur express avec ts run sur le port : ${port}`)
});

