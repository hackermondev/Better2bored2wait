import mineflayer from 'mineflayer';

declare module 'mineflayer' {
  // eslint-disable-next-line functional/prefer-type-literal
  interface Bot extends Mineflayer.Bot {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly afk: any;
  }
}
