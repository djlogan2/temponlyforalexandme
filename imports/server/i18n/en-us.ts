// TODO REMOVE IT ALL after static resources have these translations

interface ITranslation {
  locale: string;
  text: string;
  token: string;
}

const locale = "en_us";

export const translations: ITranslation[] = [
  {
    locale,
    token: "customChallenge",
    text: "Custom Challenge",
  },
  {
    locale,
    token: "launchNewChallenge",
    text: "Launch a new challenge",
  },
  {
    locale,
    token: "joinOpenChallenge",
    text: "Join an Open challenge",
  },
  {
    locale,
    token: "challenge",
    text: "Challenge",
  },
  {
    locale,
    token: "seekgraph",
    text: "Seekgraph",
  },
  {
    locale,
    token: "showMore",
    text: "Show more",
  },
];
