export const isReadySubscriptions = (subscriptions) => {
  for (const k in subscriptions) {
    if (!subscriptions[k].ready()) {
      return false;
    }
  }

  return true;
};

export const getLang = (): string =>
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  "en-us";

export const updateLocale = (locale: string): string => {
  const localeArray = locale.split("-");

  if (localeArray && localeArray.length === 2) {
    localeArray[1] = localeArray[1].toUpperCase();
  }

  return localeArray.join("-");
};
