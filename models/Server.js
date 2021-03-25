/* Servidor de express */
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const Sockets = require('./Sockets');

class Server {

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        // Crear la configuración del servidor HTTP -> (HTTP Server)
        this.server = http.createServer(this.app);

        /* Configuracion del socket server */
        this.io = socketio(this.server, {/* Configuraciones del server */});
    }

    // Desplegar el directorio publico Con nuestros middlewares
    middlewares(){
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }

    configurarSockets(){
        new Sockets(this.io);
    }

    /* Inicializamos la aplicacion APP */
    execute(){

        // Inicializar middlewares
        this.middlewares();

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar el Server
        this.server.listen(this.port, () =>{
            console.log(`Server corriendo en el puerto`, this.port);
        }); 
    }    
}

module.exports = Server;