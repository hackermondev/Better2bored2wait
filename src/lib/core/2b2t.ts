/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */

import EventEmitter from 'events';

import { Conn } from '@rob9315/mcproxy';
import { Webhook } from 'discord-webhook-client';
import { ServerClient } from 'minecraft-protocol';
import { BotOptions } from 'mineflayer';
import AntiAFK from 'mineflayer-antiafk';

// eslint-disable-next-line functional/no-let
let LOGGER_WEBHOOK = null;
if (process.env['LOGGER_WEBHOOK'])
  LOGGER_WEBHOOK = new Webhook({ url: process.env['LOGGER_WEBHOOK'] });
console.log(process.env);

import ProxyServer from './ProxyServer';
import { LoggerExtended } from './logger';

const MC_TWOBTWO2_HOST = '2b2t.org';
const MC_VERSION = '1.12.2';

export { MC_VERSION, MC_TWOBTWO2_HOST };
export default class TwoBTwo extends EventEmitter {
  private _bot: Conn;
  private readonly options: BotOptions;
  private readonly proxyServer: ProxyServer;
  private readonly _logger: LoggerExtended;
  private _lastTitle?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private i?: any;
  public inQueue: boolean;
  public reconnecting: boolean;
  public readonly queuePosition: number;

  constructor(options?: BotOptions) {
    super();
    this.queuePosition = -1;
    this.inQueue = true;
    this.reconnecting = false;
    this.options = { host: MC_TWOBTWO2_HOST, version: MC_VERSION, ...options };

    this._logger = new LoggerExtended();
    this.proxyServer = new ProxyServer();

    this.init();
  }

  init() {
    this._bot = new Conn(this.options);

    this._bot.bot.loadPlugin(AntiAFK);
    this._bot.bot.afk.setOptions({
      minWalkingTime: 60 * 1000,
      maxWalkingTime: 5 * (60 * 1000),
      chatMessages: [
        'afk uwu',
        'totally not afk ;-;',
        'aaaaaaaaaaffffffkkkkkkkk',
        'afk bruh moment',
      ],
    });
    this._logger.info('Launched 2b2t constructor');

    this._bot.bot.on('login', () => {
      this._logger.info(`Logged in as ${this._bot.bot.username}`);
    });

    this._bot.bot.on('title', (title: string) => {
      const data = JSON.parse(title);
      if (data.text && data.text.length > 2) this._lastTitle = data.text;
      this._logger.debug(`Title:`, data);
    });

    this.onDisconnect = this.onDisconnect.bind(this);
    this._bot.bot.on('end', this.onDisconnect);
    this._bot.bot.on('kicked', this.onDisconnect);
    if (LOGGER_WEBHOOK) this._logger.info(`Logger webhook: ${LOGGER_WEBHOOK}`);
  }

  getQueuePosition() {
    if (!this.inQueue) return -1;

    const bar = this._lastTitle;
    if (!bar) return -1;

    const queue = parseInt(bar.replace(/[^0-9]/g, ''));
    return queue;
  }

  onDisconnect(reason: string) {
    this._logger.error(`Disconnected: ${reason}`);

    if (!this.reconnecting) {
      this.reconnecting = true;

      // eslint-disable-next-line functional/immutable-data
      this.proxyServer._server.motd = `DISCONNECTED | null.exe`;

      this.init();
      this.start();
    }
  }

  async start() {
    this.proxyServer._server.removeAllListeners('login');
    if (this.proxyServer._server.playerCount > 0)
      Object.keys(this.proxyServer._server.clients).forEach((p) =>
        this.proxyServer._server.clients[p].end('Disconnected')
      );
    if (this.i) clearInterval(this.i);

    // eslint-disable-next-line functional/immutable-data
    this.proxyServer._server.motd = `LOADING | null.exe`;

    this._bot.bot.afk.start();
    this.proxyServer._server.on('login', (client: ServerClient) => {
      this._logger.info(`PROXY: Client ${client.username} connected`);

      this._bot.bot.afk.stop();
      client.on('packet', (_, meta, rawData) => {
        this._logger.info(
          `PROXY: Proxying (${meta.name}) packet with length ${rawData.length}`
        );
        if (meta.name == 'keep_alive' || meta.name == 'update_time') {
          this._logger.warn(`PROXY: Skipping keep_alive packet`);
          return;
        }

        this._bot.writeRaw(rawData);
      });

      client.on('end', () => {
        this._logger.warn(`PROXY: Client ${client.username} disconnected`);
        this._bot.bot.afk.start();
      });

      this._bot.sendPackets(client);
      this._bot.link(client);
    });

    // eslint-disable-next-line functional/no-let
    let lastPosition = 0;
    this.i = setInterval(() => {
      const position = this.getQueuePosition();

      if (position == -1)
        return this._logger.error(`Unable to get queue position`);
      if (position > 2) {
        if (lastPosition != position) {
          LOGGER_WEBHOOK?.send(`Queue position: ${position}, ETA: unknown`);
        }

        // eslint-disable-next-line functional/immutable-data
        this.proxyServer._server.motd = `Queue position: ${position} | null.exe`;
        lastPosition = position;
        this._logger.info(`Queue position: ${position}`);
      } else {
        if (this.inQueue) {
          this._logger.info(`Queue is done. User is ready to join the game.`);
          this.inQueue = false;
          LOGGER_WEBHOOK?.send(
            `@everyone\nQueue is done. User is ready to join the game.`
          );
        }
      }
    }, 10 * 1000);
  }
}
