import ini from 'ini';

export const iniStrategy = {
  serialize: (data: any) => ini.stringify(data), // js object to string(ini format)
  deserialize: (data: string) => ini.parse(data), // string(ini format) to js object
};

export const jsonStrategy = {
  serialize: (data: any) => JSON.stringify(data, null, '  '), // js object to string(json format)
  deserialize: (data: string) => JSON.parse(data), // string(json format) to js object
};

export const yamlStrategy = {
  serialize: (data: any) => require('js-yaml').dump(data), // js object to string(yaml format)
  deserialize: (data: string) => require('js-yaml').load(data), // string(yaml format) to js object
};
