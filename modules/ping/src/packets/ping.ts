import { PacketTypesI, types } from './types';
import { OBasePacketI, BasePacket } from '@p2p-comm/base';

export interface OPingPacket extends OBasePacketI {
  type: PacketTypesI['PING'];
}
export class PingPacket extends BasePacket<null, OPingPacket> implements OPingPacket {

  static type = types.PING;
  public type = types.PING;

  constructor() {
    super();
    this.fromOptions(null);
  }

  static fromObject() {
    return (new this());
  }

  static fromRaw(buf: Buffer): PingPacket {
    return (new this()).fromRaw(buf);
  }

  getTypeName() {
    return 'PING';
  }

}
