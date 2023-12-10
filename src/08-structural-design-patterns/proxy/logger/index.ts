import { createWriteStream } from "fs";
import { createLogginWritable } from "./logging-writable";
import path from "path";

const writable = createWriteStream(path.join(__dirname, "./test.txt"));
const writableProxy = createLogginWritable(writable);

writableProxy.write("First chunk");
writableProxy.write("Second chunk");
writable.write("This is not logged");
writableProxy.end();
