import pako from "pako";
import base64 from "base64-js";

const zlib_decompress = input => {
  const byteArray = base64.toByteArray(input);
  return String.fromCharCode.apply(
    null,
    new Uint8Array(pako.inflate(byteArray)),
  );
};

export {zlib_decompress};
