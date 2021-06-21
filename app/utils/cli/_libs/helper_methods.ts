const fs = require('fs');
/**
 * @param object
 * {
 *  a: {
 *    b: 100,
 *    c: 200
 *  }
 * }
 * @return array
 * [
 *   ['a->b', 100]
 *   ['a->c', 200]
 * ]
 */
export const getXPathArrayFromObject = (object, parent_keys = []) => {
  const keys = Object.keys(object).sort();
  let ret1 = [],
    ret2 = [];
  keys.map(key => {
    if (typeof object[key] !== 'object') {
      let xpath;
      if (parent_keys.length > 0) xpath = parent_keys.join('->') + '->' + key;
      else xpath = key;
      ret1.push([xpath, object[key]]);
      // ret.push(xpath);
    } else {
      ret2 = ret2.concat(
        getXPathArrayFromObject(object[key], parent_keys.concat(key)),
      );
    }
  });
  return ret1.concat(ret2);
};

/**
 *
 * @param object
 * ex: ...
 * {
 *  a: {
 *    b: 100,
 *    c: 200,
 *  }
 * }
 * @param path
 * ex: 'a->b'
 *
 * @return value/object
 * ex: 100
 */
export const getObjectByPath = (object, path = '') => {
  if (path) {
    let _object = '';
    path.split(/\-\>/gi).map(_path => {
      _object = object[_path];
      if (typeof _object === 'undefined') return undefined;
      if (typeof _object === 'object') object = _object;
    });
    return _object;
  } else return path;
};

/**
 * @param array
 * [
 *   ['a->b', 100]
 *   ['a->c', 200]
 * ]
 * @return object
 * {
 *  a: {
 *    b: 100,
 *    c: 200
 *  }
 * }
 */
export const getObjectFromXPathArray = XPathArray => {
  const ret = {};
  XPathArray.map(XPath => {
    const XPathKey = XPath[0];
    const XPathValue = XPath[1];
    if (XPathKey.indexOf('->') === -1) {
      ret[XPathKey] = XPathValue;
    } else {
      let last_XPathNode = ret;
      let last_XPathKey = '';
      const XPathKeyArray = XPathKey.split(/\-\>/gi);
      XPathKeyArray.map((_XPathKey, index) => {
        if (!last_XPathNode[_XPathKey]) {
          last_XPathNode[_XPathKey] = {};
        }
        last_XPathKey = _XPathKey;
        if (index < XPathKeyArray.length - 1)
          last_XPathNode = last_XPathNode[_XPathKey];
      });
      last_XPathNode[last_XPathKey] = XPathValue;
    }
  });
  return ret;
};

/**
 * @param object
 * {a: b: c: 100}
 *
 * @return string
 * {
 *   a: {
 *     b: {
 *       c: 100
 *     }
 *   }
 * }
 */
export const beautifyObjectWithEscape = (object, depth = 0) => {
  return beautifyObject(object, depth, escape2);
};

export const beautifyObject = (object, depth = 0, applyCallback = _ => _) => {
  const quot_mark = '"';
  const keys = Object.keys(object);
  let tab_string = '  '.repeat(depth + 1);
  let tab_string2 = '  '.repeat(depth);
  let ret1 = '';

  const string_keys = keys
    .filter(key => typeof object[key] !== 'object')
    .sort();
  string_keys.map((key, index) => {
    const comma = string_keys.length - 1 === index ? '' : ',';
    const crlf = string_keys.length - 1 === index ? '' : '\n';
    ret1 += `${tab_string}${key}: ${quot_mark}${applyCallback(
      object[key],
    )}${quot_mark}${comma}${crlf}`;
  });

  let ret2 = '';
  const object_keys = keys
    .filter(key => typeof object[key] === 'object')
    .sort();
  object_keys.map((key, index) => {
    const comma = object_keys.length - 1 === index ? '' : ',';
    const crlf = object_keys.length - 1 === index ? '' : '\n';
    ret2 +=
      `${tab_string}${key}: ` +
      beautifyObject(object[key], depth + 1, applyCallback) +
      `${comma}${crlf}`;
  });
  const ret =
    ret1 === '' ? ret2 : ret2 === '' ? ret1 : [ret1, ret2].join(',\n');
  return '{\n' + ret + `\n${tab_string2}}`;
};

const escape2 = str =>
  str
    .replace(/\n/gi, '\\n')
    .replace(/\\n /gi, '\\n')
    .replace(/\"/gi, '\\"')
    .replace(/  /gi, ' ')
    .replace(/  /gi, ' ')
    .replace(/  /gi, ' ')
    .replace(/  /gi, ' ')
    .replace(/  /gi, ' ')
    .replace(/  /gi, ' ')
    .replace(/  /gi, ' ')
    .replace(/  /gi, ' ')
    .replace(/  /gi, ' ');

export const getValueFromConstants = key => {
  const constants = fs.readFileSync('./app/config/constants.ts', 'utf-8');
  const patternReg = new RegExp(`${key}:[\\s]['"]([^'"]+)['"]`, 'gim');
  const matchedStr = (constants.match(patternReg) || []).join('');
  return matchedStr.replace(patternReg, '$1');
};
