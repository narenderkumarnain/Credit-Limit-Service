/**
 *  index.ts
 */

import dotenv from 'dotenv';
import App from './App';

import MongoClient from './clients/MongoClient';

dotenv.config();

MongoClient.connectDatabase();

const app = new App(8080);
app.startServer();