export const validationResponseErrors = (errors = []) => {
  return errors.reduce((fields, { param, msg, value }) => {
    if (param in fields) {
      fields[param].push(msg);
    } else {
      fields[param] = [msg];
    }

    return fields;
  }, {});
};
