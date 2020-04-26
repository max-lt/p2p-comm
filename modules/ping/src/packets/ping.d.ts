/// <reference types="node" />
import { PacketTypesI } from './types';
import { OBasePacketI, BasePacket } from '@p2p-comm/base';
export interface OPingPacket extends OBasePacketI {
    type: PacketTypesI['PING'];
}
export declare class PingPacket extends BasePacket<null, OPingPacket> implements OPingPacket {
    static type: 131;
    type: 131;
    constructor();
    static fromObject(): PingPacket;
    static fromRaw(buf: Buffer): PingPacket;
    getTypeName(): string;
}
