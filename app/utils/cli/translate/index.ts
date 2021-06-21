import { synchronizeTwoLanguages } from "./helper_methods";

// @ts-ignore
const mode = process.argv[2];
switch (mode) {
  case '-sync':
    // @ts-ignore
    const lang1 = process.argv[3];
    // @ts-ignore
    const lang2 = process.argv[4];
    if (lang1 && lang2) {
      synchronizeTwoLanguages(lang1, lang2);
    }
    break;
}
