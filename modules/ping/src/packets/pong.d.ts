/// <reference types="node" />
import { PacketTypesI } from './types';
import { OBasePacketI, BasePacket } from '@p2p-comm/base';
export interface OPongPacket extends OBasePacketI {
    type: PacketTypesI['PONG'];
}
export declare class PongPacket extends BasePacket<null, OPongPacket> implements OPongPacket {
    static type: 132;
    type: 132;
    constructor();
    static fromObject(): PongPacket;
    static fromRaw(buf: Buffer): PongPacket;
    getTypeName(): string;
}
