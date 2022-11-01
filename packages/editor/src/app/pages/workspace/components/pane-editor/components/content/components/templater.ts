export const render = (value: any, template: string) => {
  value = String(value);

  let re = /{(\s+)?\d(\s+)?,?(\s+)?\d?(\s+)?(=(\s+)?[a-zA-Z0-9_]+)?}/g;
  let out: string = template;
  var match = re.exec(template);

  // Substitutes
  while (match) {
    const token = match[0];

    const dRe = /\d/g;
    const start: any = parseInt((dRe.exec(token) as any)[0]);
    const tokenVal2: any = dRe.exec(token);
    const end = tokenVal2 ? parseInt(tokenVal2[0]) + start : Number.POSITIVE_INFINITY;

    const subValue = token.split(/[=}]/g);

    if (tokenVal2 && subValue[1].trim()) {
      const length = parseInt(tokenVal2[0]);
      const repeated = subValue[1].trim().repeat(length);
      let replaceValue = value.substring(start, end);
      if (replaceValue.length < length) {
        replaceValue += repeated.substr(0, length - replaceValue.length);
      }
      out = out.replace(match[0], replaceValue);
    } else {
      out = out.replace(match[0], value.substring(start, end));
    }

    match = re.exec(template);
  }

  // Conditionals
  re = /{[?!](.+?)=(.+?)}/g;
  match = re.exec(template);

  while (match) {
    let token = match[0];
    match = re.exec(template);

    token = token.replace("{", "");
    token = token.replace("}", "");

    const tokenParts: any = token.split("=");

    let searchMatch = false;
    if (tokenParts[0].trim().startsWith("?")) {
      if (value.trim() === tokenParts[0].substring(1).trim()) {
        searchMatch = true;
      }
    } else if (tokenParts[0].trim().startsWith("!")) {
      // Not Equals
      if (value.trim() !== tokenParts[0].substring(1).trim()) {
        searchMatch = true;
      }
    }

    if (searchMatch) {
      out = out.replace("{" + token + "}", tokenParts[1]);
    } else {
      out = out.replace("{" + token + "}", "");
    }
  }

  return out;
};

export default {
  render,
};
