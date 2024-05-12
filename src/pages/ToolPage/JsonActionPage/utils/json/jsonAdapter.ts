import { FileFormat } from 'src/enums/file.enum';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const keyExists = (obj: Record<string, any>, key: string): boolean => {
  if (!obj || (typeof obj !== 'object' && !Array.isArray(obj))) {
    return false;
    // eslint-disable-next-line no-prototype-builtins
  } else if (obj.hasOwnProperty(key)) {
    return obj[key];
  } else if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const result = keyExists(obj[i], key);

      if (result) {
        return result;
      }
    }
  } else {
    for (const k in obj) {
      const result = keyExists(obj[k], key);

      if (result) {
        return result;
      }
    }
  }

  return false;
};

const contentToJson = async (
  value: string,
  format = FileFormat.JSON
): Promise<object> => {
  const { load } = await import('js-yaml');
  const { csv2json } = await import('json-2-csv');
  const { parse } = await import('jsonc-parser');
  const jxon = await import('jxon');
  const toml = await import('toml');

  let json: object = {};

  if (format === FileFormat.JSON) json = parse(value);
  if (format === FileFormat.YAML) json = load(value) as object;
  if (format === FileFormat.XML) json = jxon.stringToJs(value);
  if (format === FileFormat.TOML) json = toml.parse(value);
  if (format === FileFormat.CSV) json = await csv2json(value);
  if (format === FileFormat.XML && keyExists(json, 'parsererror'))
    throw Error('Unknown error!');

  if (!json) throw Error('Invalid JSON!');

  return Promise.resolve(json);
};

const jsonToContent = async (
  json: string,
  format: FileFormat
): Promise<string> => {
  const { dump } = await import('js-yaml');
  const { json2csv } = await import('json-2-csv');
  const { parse } = await import('jsonc-parser');

  let contents = json;

  if (!json) return json;
  if (format === FileFormat.JSON) contents = json;
  if (format === FileFormat.YAML) contents = dump(parse(json));
  if (format === FileFormat.XML) contents = dump(parse(json));
  if (format === FileFormat.TOML) contents = dump(parse(json));
  if (format === FileFormat.CSV) contents = await json2csv(parse(json));

  return Promise.resolve(contents);
};

export { contentToJson, jsonToContent };
