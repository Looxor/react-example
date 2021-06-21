const validation = (value, rules, form = {}) => {
  let valid = true;

  for (let rule in rules) {
    switch (rule) {
      case 'isRequired':
        valid = valid && validateRequired(value);
        break;
      case 'isEmail':
        valid = valid && validateEmail(value);
        break;
      case 'minLength':
        valid = valid && validateMinLength(value, rules[rule]);
        break;
      case 'maxLength':
        valid = valid && validateMaxLength(value, rules[rule]);
        break;
      case 'confirmPass':
        valid = valid && validateConfirmPass(value, form[rules[rule]].value);
        break;
      default:
        valid = true;
    }
  }

  return valid;
};

const validateRequired = value => {
  if (value !== '') {
    return true;
  }
  return false;
};

export const validateEmail = email => {
  if (email === '' || email === undefined) return true;
  const expression =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return expression.test(String(email).toLowerCase());
};

const validateConfirmPass = (confirmPass, pass) => {
  return confirmPass === pass;
};

export const validateMinLength = (value, ruleValue) => {
  if (value.length >= ruleValue) {
    return true;
  }
  return false;
};

export const validateMaxLength = (value, ruleValue) => {
  if (value.length <= ruleValue) {
    return true;
  }
  return false;
};

export const validateMustContainUpperCase = value => {
  return /[A-Z]/.exec(value) !== null;
};

export const validateMustContainLowerCase = value => {
  return /[a-z]/.exec(value) !== null;
};

export const validateMustContainNumber = value => {
  return /\d/.exec(value) !== null;
};

export default validation;
