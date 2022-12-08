export const toCapital = (str: string) => {
  return str.replace(/^[A-Z|a-z]/g, letter => letter.toUpperCase());
};

export default {
  toCapital,
};
