import {createHash} from 'node:crypto';

// Original locally rendered brand artwork. Reject every unreviewed replacement.
export const SHARE_CARD='controls-exchange-share.png';
export function validateShareCard(file,bytes){
 if(file!==SHARE_CARD||!Buffer.isBuffer(bytes)||bytes.length!==39277||
    bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a'||
    bytes.readUInt32BE(16)!==1200||bytes.readUInt32BE(20)!==630||
    createHash('sha256').update(bytes).digest('hex')!=='9575f05022fee568a593b5ef56da44792c56a94829cae227364c3d9f2a2038f1')throw Error('Unreviewed sharing artwork: '+file);
 return bytes;
}
