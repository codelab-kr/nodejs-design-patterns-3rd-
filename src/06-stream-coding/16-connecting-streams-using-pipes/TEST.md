echo Hello World! | yarn run dev src/stream-coding/16-connecting-streams-using-pipes/replace World Node.js

echo Hello World! | gzip | ts-node --transpile-only src/stream-coding/16-connecting-streams-using-pipes/uppercasify-gzipped | gunzip

yarn run dev src/stream-coding/16-connecting-streams-using-pipes/concat-files-cli src/stream-coding/files/all.txt src/stream-coding/files/file1.txt src/stream-coding/files/file2.txt src/stream-coding/files/file3.txt

yarn run dev src/stream-coding/16-connecting-streams-using-pipes/check-urls src/stream-coding/16-connecting-streams-using-pipes/urls.txt

yarn run dev src/stream-coding/16-connecting-streams-using-pipes/parallel-stream-orderd.ts src/stream-coding/16-connecting-streams-using-pipes/urls.txt


yarn run dev src/stream-coding/16-connecting-streams-using-pipes/archive mypassword src/stream-coding/16-connecting-streams-using-pipes/results.txt
src/stream-coding/16-connecting-streams-using-pipes/results.txt.gz.enc created with iv: 1c92e53b65a2bf3f441117b068351caf

yarn run dev src/stream-coding/16-connecting-streams-using-pipes/merge-lines mypassword .prettierrc nodemon.json