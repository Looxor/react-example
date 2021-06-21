const fs = require('fs');
import { beautifyObjectWithEscape, getObjectFromXPathArray, getXPathArrayFromObject } from "../_libs/helper_methods";

/**
 * @param lang [en]
 * @return object
 * require('../../../config/strings.en')
 * or if not exists
 * {}
 */
export const getObjectByLangName = lang => {
  try {
    const BASE_PATH = '../../../config/strings.';
    const lang_object = require(BASE_PATH + lang);
    return lang_object.default;
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      return {};
    }
  }
};

/**
 *
 * @param lang1 'en/it'
 * @param lang2 'en/it'
 *
 */
export const synchronizeTwoLanguages = (lang1, lang2) => {
  backupLanguage(lang1);
  backupLanguage(lang2);
  const langObj1 = getObjectByLangName(lang1);
  const langObj2 = getObjectByLangName(lang2);

  const langArray1 = getXPathArrayFromObject(langObj1);
  const langArray2 = getXPathArrayFromObject(langObj2);
  langArray1.map(keyValue => {
    if (!langArray2.some(keyValue1 => keyValue1[0] === keyValue[0])) {
      langArray2.push(keyValue);
    }
  });

  langArray2.map(keyValue => {
    if (!langArray1.some(keyValue1 => keyValue1[0] === keyValue[0])) {
      langArray1.push(keyValue);
    }
  });

  const newLangObj1 = getObjectFromXPathArray(langArray1);
  const newLangObj2 = getObjectFromXPathArray(langArray2);

  const lang1_path = `./app/config/strings.${lang1}.ts`;
  fs.unlink(lang1_path, err => {});
  fs.writeFile(
    lang1_path,
    'export default ' + beautifyObjectWithEscape(newLangObj1) + ';',
    err => {},
  );

  const lang2_path = `./app/config/strings.${lang2}.ts`;
  fs.unlink(lang2_path, err => {});
  fs.writeFile(
    lang2_path,
    'export default ' + beautifyObjectWithEscape(newLangObj2) + ';',
    err => {},
  );
};

export const backupLanguage = lang => {
  const pad0 = val => (val < 10 ? '0' : '') + parseInt(val);
  try {
    const date = new Date();
    const month = date.getMonth() + 1;
    const date2 = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const dir_path = `./langs/${date.getFullYear()}-${pad0(month)}-${pad0(
      date2,
    )}-${pad0(hours)}-00`;
    fs.mkdirSync(dir_path, {recursive: true});
    fs.unlink(`${dir_path}/strings.${lang}.ts`, err => {});
    fs.copyFile(
      `./app/config/strings.${lang}.ts`,
      `${dir_path}/strings.${lang}.ts`,
      err => {},
    );
  } catch (error) {
    console.log('error on backing up', error);
  }
};
