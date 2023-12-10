import { ReplaceStream } from "../replace-stream2";


process.stdin
  .pipe(new ReplaceStream(process.argv[2], process.argv[3]))
  .pipe(process.stdout)
