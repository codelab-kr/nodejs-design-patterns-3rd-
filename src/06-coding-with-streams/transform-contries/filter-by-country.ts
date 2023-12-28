import { Transform } from 'stream';

export class FilterByCountry extends Transform {
  constructor(private country: string, options: any = {}) {
    options.objectMode = true;
    super(options);
    this.country = country;
  }

  _transform(record: any, encoding: BufferEncoding, callback: any) {
    if (record.country === this.country) {
      this.push(record);
    }
    callback();
  }
}