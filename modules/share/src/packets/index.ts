import { GetpeersPacket, IGetpeersPacket } from './getpeers';
export { GetpeersPacket, IGetpeersPacket };

import { SendpeersPacket, ISendpeersPacket } from './sendpeers';
export { SendpeersPacket, ISendpeersPacket };

export type Packet = GetpeersPacket | SendpeersPacket;
export type PacketTypes = typeof GetpeersPacket | typeof SendpeersPacket;
