// eslint-disable-next-line import/order
import path from 'path';
import dotenv from 'dotenv';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
if (process.pkg) {
  dotenv.config({ path: path.join(process.cwd(), '.env') });
} else {
  dotenv.config({ path: path.join(__dirname, '../../.env') });
}

import TwoBTwo from './lib/core/2b2t';

const t = new TwoBTwo({
  username: process.env['MINECRAFT_USERNAME'],
  password: process.env['MINECRAFT_PASSWORD'],
  auth: process.env['MINEFLAYER_AUTH'] == 'mojang' ? 'mojang' : 'microsoft',
});

t.start();
