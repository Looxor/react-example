const fs = require('fs');
const mathjax =
  require('react-native-mathjax-svg/mathjax/es5/js/mathjax.js').mathjax;
const TeX = require('react-native-mathjax-svg/mathjax/es5/js/input/tex.js').TeX;
const SVG =
  require('react-native-mathjax-svg/mathjax/es5/js/output/svg.js').SVG;
const liteAdaptor =
  require('react-native-mathjax-svg/mathjax/es5/js/adaptors/liteAdaptor.js').liteAdaptor;
const RegisterHTMLHandler =
  require('react-native-mathjax-svg/mathjax/es5/js/handlers/html.js').RegisterHTMLHandler;
const PACKAGES =
  'action, ams, amsCd, base, bbox, boldsymbol, braket, cancel, color, configMacros, enclose, extpfeil, mhchem, newcommand, noerrors, noundefined, unicode';
const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

const params = {
  ex: 8,
  em: 16,
  width: 80,
  inline: true,
  packages: PACKAGES,
  fontCache: true,
};

const texToSvg = (textext = '') => {
  if (!textext) {
    return '';
  }
  const tex = new TeX({packages: params.packages.split(/\s*,\s*/)});
  const svg = new SVG({fontCache: params.fontCache ? 'local' : 'none'});
  const html = mathjax.document('', {InputJax: tex, OutputJax: svg});
  const node = html.convert(textext, {
    display: true,
    em: params.em,
    ex: params.ex,
  });

  let svgString = adaptor.outerHTML(node) || '';
  svgString = svgString.replace(
    /\<mjx-container.*?\>(.*)\<\/mjx-container\>/gi,
    '$1',
  );

  const [width, height] = getScale(svgString);
  // svgString = applyScale(svgString, [width * 10, height * 10]);

  return `${svgString}`;
};

const getScale = _svgString => {
  const svgString = _svgString.match(/<svg([^\>]+)>/gi).join('');

  let [width, height] = (svgString || '')
    .replace(
      /.* width=\"([\d\.]*)[ep]x\".*height=\"([\d\.]*)[ep]x\".*/gi,
      '$1,$2',
    )
    .split(/\,/gi);
  [width, height] = [parseFloat(width), parseFloat(height)];
  return [width, height];
};

const applyScale = (svgString, [width, height]) => {
  let retSvgString = svgString.replace(
    /(<svg[^\>]+height=\")([\d\.]+)([ep]x\"[^\>]+>)/gi,
    `$1${height}$3`,
  );
  retSvgString = retSvgString.replace(
    /(<svg[^\>]+width=\")([\d\.]+)([ep]x\"[^\>]+>)/gi,
    `$1${width}$3`,
  );
  return retSvgString;
};

const applyColor = (svgString, fillColor) => {
  let retSvgString = svgString.replace(/currentColor/gim, `${fillColor}`);
  return retSvgString;
};
const extractFormula = string => {
  return string.match(/(\$.*?\$)/gi) || [];
};

export const writeLatexs = latexs => {
  try {
    const dir_path = `./app/utils/cli/mathjax/latexes.html`;
    fs.unlink(dir_path, err => {});
    fs.writeFileSync(dir_path, latexs, err => {}, {flag: 'w'});
    return dir_path;
  } catch (error) {}
};

const getLatexesHtmlFromArray = LatexArray => {
  let trs = '';

  for (let index = 0; index < LatexArray.length; index++) {
    let value = LatexArray[index];
    value = value.substr(1, value.length - 2);
    let svgXml = texToSvg(value);
    trs += `\t<tr><td>${index}</td><td>${value}</td><td width="50%" style="height: 30px;" >${svgXml}</td>\n`;
  }
  return `<table border="1" width="70%">\n${trs}</table>`;
};

const parseLatexQuestions = () => {
  const formulae = [];
  const questions_array = require('../../../../docs/TestData/latex_questions.json.orig');
  questions_array.map(question => {
    extractFormula(question.Domanda).map(formula => {
      formulae.push(formula);
    });
    extractFormula(question.R0).map(formula => {
      formulae.push(formula);
    });
    extractFormula(question.R1).map(formula => {
      formulae.push(formula);
    });
    extractFormula(question.R2).map(formula => {
      formulae.push(formula);
    });
    extractFormula(question.R3).map(formula => {
      formulae.push(formula);
    });
    extractFormula(question.R4).map(formula => {
      formulae.push(formula);
    });
  });
  writeLatexs(getLatexesHtmlFromArray(formulae));
};

export {parseLatexQuestions};
