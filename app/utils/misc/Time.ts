export const getCurrentISOTime = () => {
  return new Date();
  // return new Date(+new Date() - new Date().getTimezoneOffset() * 60 * 1000);
};
