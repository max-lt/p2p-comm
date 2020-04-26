import { OBasePacketI, IBasePacketI, BasePacket, PacketMetaI, util } from '@p2p-comm/base';
import { PacketTypesI, types } from './types';

type PeerInfoList = Array<util.PeerInfo>;

export interface ISendpeersPacket extends IBasePacketI {
  peers: PeerInfoList;
}
export interface OSendpeersPacket extends OBasePacketI {
  type: PacketTypesI['SENDPEERS'];
  peers: PeerInfoList;
}
export class SendpeersPacket extends BasePacket<ISendpeersPacket, OSendpeersPacket> implements OSendpeersPacket {

  public type = types.SENDPEERS;
  public peers: PeerInfoList;

  static fromObject(obj: ISendpeersPacket) {
    return (new this()).fromOptions(obj);
  }

  static fromRaw(buf: Buffer): SendpeersPacket {
    return (new this()).fromRaw(buf);
  }

  private decodePeers(buf: Buffer, offset: number): PeerInfoList {
    const len = buf.readUInt32BE(offset);
    const list = [];
    let _offset = offset + 4;
    for (let i = 0; i < len; i++) {
      const [peer, __offset] = util.decodePeer(buf, _offset);
      _offset = __offset;
      list.push(peer);
    }
    return list;
  }

  private encodePeers(): Buffer {
    const list: Buffer[] = [];
    for (const peer of this.peers) {
      list.push(util.encodePeer(peer));
    }
    return Buffer.concat(list);
  }

  protected fromRaw(buf: Buffer) {
    super.fromRaw(buf);
    this.peers = this.decodePeers(buf, util.metaLength);
    return this;
  }

  protected fromOptions(opts: ISendpeersPacket) {
    super.fromOptions(opts);
    this.peers = opts.peers;
    return this;
  }

  toJSON(): OSendpeersPacket & PacketMetaI {
    return Object.assign(this.getMeta(), {
      peers: this.peers,
      type: this.type
    });
  }

  toRaw(): Buffer {
    const meta = this.encodeRawMeta();
    const number = util.writeUInt32(this.peers.length);
    const peers = this.encodePeers();
    return Buffer.concat([meta, number, peers]);
  }

  getSize() {
    return 4 + this.peers.reduce((acc, peer) => acc + 4 + (4 + peer.host.length) + (4 + peer.peerId.length / 2), 0);
  }

}
