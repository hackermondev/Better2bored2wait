/* eslint-disable import/order */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import { createServer, Server, ServerClient } from 'minecraft-protocol';
import { MC_VERSION } from './2b2t';

export default class ProxyServer {
    public readonly _server: Server;
    // eslint-disable-next-line functional/prefer-readonly-type
    public _clients: ServerClient[];

    constructor() {
        this._clients = [];
        
        this._server = createServer({ 'version': MC_VERSION, 'online-mode': false, 'host': '0.0.0.0', 'port': 25565, 'maxPlayers': 1 });
        this._server.on('login', (client: ServerClient) => {
            // eslint-disable-next-line functional/immutable-data
            this._clients.push(client)
        });
    }
};