const fs = require('fs');
import { getXPathArrayFromObject } from "../_libs/helper_methods";

/**
 * @param lang [en]
 * @return object
 * require('../../../config/strings.en')
 * or if not exists
 * {}
 */
export const getObjectColors = () => {
  try {
    const BASE_PATH = '../../../config/colors.ts';
    const lang_object = require(BASE_PATH);
    return lang_object.default;
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      return {};
    }
  }
};

const getColorsHtmlFromXPathArray = XPathArray => {
  let trs = '';
  XPathArray.map(keyValue => {
    const key = keyValue[0],
      value = keyValue[1];
    trs += `\t<tr><td>${key}</td><td>${value}</td><td width="50%" style="background-color: ${value}">&nbsp;</td>\n`;
  });
  return `<table border="1" width="70%">\n${trs}</table>`;
};

/**
 *
 * @param lang1 'en/it'
 * @param lang2 'en/it'
 *
 */
export const listColors = () => {
  const colorObjects = getObjectColors();

  const colorsArray = getXPathArrayFromObject(colorObjects);

  const colors_html = getColorsHtmlFromXPathArray(colorsArray);

  return writeColors(colors_html);
};

export const writeColors = colors_html => {
  try {
    const dir_path = `./app/utils/cli/colors/color_list.html`;
    fs.unlink(dir_path, err => {});
    fs.writeFileSync(dir_path, colors_html, err => {}, {flag: 'w'});
    return dir_path;
  } catch (error) {}
};
