import { config } from 'dotenv';
config();

import { Server } from './Server/Server';

const server = Server.instance;

Server.Db.initialize().then(() => console.log('Initialize database...'));

server.listen();
