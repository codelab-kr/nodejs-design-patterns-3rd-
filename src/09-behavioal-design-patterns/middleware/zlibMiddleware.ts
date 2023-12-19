import { inflateRawSync, deflateRawSync } from "zlib";

export const zlibMiddleware = function () {
    return {
        inbound(message: any) {
            return inflateRawSync(Buffer.from(message));
        },
        outbound(message: any) {
            return deflateRawSync(message);
        }
    };
}