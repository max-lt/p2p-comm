import { PingPacket } from './ping';
export { PingPacket };
import { PongPacket } from './pong';
export { PongPacket };
export declare type Packet = PingPacket | PongPacket;
export declare type PacketTypes = typeof PingPacket | typeof PongPacket;
