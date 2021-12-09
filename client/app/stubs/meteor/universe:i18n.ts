module.exports = {
  i18n: {
    createTranslator: (name: string) => () => name,
    onceChangeLocale: (callback: Function) => {
      callback();
    },
  },
};
