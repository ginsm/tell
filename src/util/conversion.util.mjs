export const curry = {
  generic: ({ prop = '', fallback = '' }) => {
    return (obj = {}, value = fallback) => {
      obj[prop] = (value || fallback);
      return obj;
    };
  },

  event: ({ type = '', action = '', ignoreEmpty = false }) => {
    return (obj = {}, value = '') => {
      if (ignoreEmpty && !value) return false;
      obj[`${type}Event`] = { action, value };
      return obj;
    };
  },
};

export const assignMethodAliases = (obj, aliases = {}) => {
  for (const [key, value] of Object.entries(aliases)) {
    obj[key] = obj[value];
  }
}