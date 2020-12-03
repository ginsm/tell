export const curry = {
  generic: ({ prop = '', _default = '' }) => {
    return (obj = {}, value = _default) => {
      obj[prop] = (value || _default);
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

export const assignMethodAlias = (obj, aliases = {}) => {
  for (const [key, value] of Object.entries(aliases)) {
    obj[key] = obj[value];
  }
}