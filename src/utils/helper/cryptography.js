import forge from 'node-forge';
import { AES_KEY, IV } from 'utils/constant';
const ALGORITHM = 'AES-CBC';

function encrypt(text) {
  var mycipher = forge.cipher.createCipher(ALGORITHM, AES_KEY);
  mycipher.start({ iv: IV });
  mycipher.update(forge.util.createBuffer(text));
  mycipher.finish();
  var encrypted = mycipher.output;
  return forge.util.encode64(encrypted.getBytes());
}

function decrypt(cipher) {
  var str = forge.util.decode64(cipher);
  var decipher = forge.cipher.createDecipher(ALGORITHM, AES_KEY);
  decipher.start({ iv: IV });
  decipher.update(forge.util.createBuffer(str));
  decipher.finish();
  return decipher.output.toString();
}

export { encrypt, decrypt };
