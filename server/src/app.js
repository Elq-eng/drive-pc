import dotenv from 'dotenv';
dotenv.config()
import Server from './model/server.js'


const server = new Server()

server.listen()

