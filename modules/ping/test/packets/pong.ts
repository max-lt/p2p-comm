import * as assert from 'assert';

import { PongPacket } from '../../src/packets';

describe('packets.pong tests', () => {
  const packet = PongPacket.fromObject();

  it('sould be able to encode/decode handshake packet', () => {
    const copy = PongPacket.fromRaw(packet.toRaw());
    assert.equal(packet.toRaw().toString('hex'), copy.toRaw().toString('hex'));
  });

  it('should be able to return it\'s raw size', () => {
    assert.equal(packet.toRaw().length, packet.getTotalSize());
  });

  it('should have static property "type"', () => {
    assert.notEqual(-1, PongPacket.type);
  });
});
