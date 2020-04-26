import { Module } from '@p2p-comm/base';

import { SendpeersPacket, GetpeersPacket } from './packets';

export class PingModule extends Module {
  constructor() {
    super({
      Peer: null,
      Pool: null,
      packets: [SendpeersPacket, GetpeersPacket]
    });
  }
}
