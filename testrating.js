const P1WINCHANCE = 0.2;
const P1DRAWCHANCE = 0.1;
const GAMECOUNT = 100000;
const P1INITIALRATING = 1600;
const P2INITIALRATING = 1600;
const P1GAMES = 0;
const P2GAMES = 20;

function winDrawLossAssessValues(robject1, robject2) {
  let adjust = 0;
  const avg = (robject1.rating + robject2.rating) / 2.0;
  if (avg < 1600.0) adjust = 1;
  else if (avg > 1600.0) adjust = -1;

  const opponentNumberOfGames = robject2.won + robject2.draw + robject2.lost;
  const yourNumberOfGames = robject1.won + robject1.draw + robject1.lost;
  const Kopp = opponentNumberOfGames > 20 ? 1 : 1 + opponentNumberOfGames;
  const KYou = yourNumberOfGames > 20 ? 1 : 21;
  const KYourDiv = yourNumberOfGames > 20 ? 1 : 1 + yourNumberOfGames;
  const KOppdiv = opponentNumberOfGames > 20 ? 1 : 21;
  const resultw =
    robject1.rating +
    ((32 + adjust) *
      Kopp *
      KYou *
      (1 - 1 / (1 + 10 ** ((robject2.rating - robject1.rating) / 400.0)))) /
      KYourDiv /
      KOppdiv;
  const resultd =
    robject1.rating +
    ((32 + adjust) *
      Kopp *
      KYou *
      (0.5 - 1 / (1 + 10 ** ((robject2.rating - robject1.rating) / 400.0)))) /
      KYourDiv /
      KOppdiv;
  const resultl =
    robject1.rating +
    ((32 + adjust) *
      Kopp *
      KYou *
      (0 - 1 / (1 + 10 ** ((robject2.rating - robject1.rating) / 400.0)))) /
      KYourDiv /
      KOppdiv;

  return {
    win: Math.ceil(resultw),
    draw: Math.round(resultd),
    loss: Math.floor(resultl),
  };
}

function determineColor(games, p1, p2) {
  let p1white = 0;

  let weight = games.length;
  const count = weight;

  games.forEach((color) => {
    if (color === "w") p1white -= weight;
    else p1white += weight;
    weight -= 1;
  });

  // Get the weight between 0 and 1
  if (count) p1white /= (count * (count + 1)) / 2;

  // History accounts for 2/3 of the choice
  p1white *= 2;

  // The rating difference accounts for 1/3 of the choice
  if (p1.rating > p2.rating) {
    p1white += p2.rating / p1.rating - 1.0;
  } else {
    p1white += 1.0 - p1.rating / p2.rating;
  }

  // Now we have a weighted score of who is more or less likely to be white
  p1white /= 3;
  // // We have to get it +/- 0.5
  // p1white /= 2;
  const chance = 0.5 + p1white;
  const random = Math.random();
  const ret = {
    weight: p1white,
    random,
    chance,
  };
  if (random < chance) ret.color = "w";
  else ret.color = "b";
  return ret;
}

const p1 = {
  won: P1GAMES,
  lost: 0,
  draw: 0,
  rating: P1INITIALRATING,
};
const p2 = {
  won: P2GAMES,
  lost: 0,
  draw: 0,
  rating: P2INITIALRATING,
};
const games = [];

for (let x = 0; x < GAMECOUNT; x += 1) {
  const color = determineColor(games, p1, p2);
  games.push(color.color);
  let result = Math.random();
  const p1assess = winDrawLossAssessValues(p1, p2);
  const p2assess = winDrawLossAssessValues(p2, p1);
  let stringresult;

  if (result <= P1WINCHANCE) {
    stringresult = "p1 won ";
    p1.rating = p1assess.win;
    p2.rating = p2assess.loss;
    p1.won += 1;
    p2.lost += 1;
  } else {
    result -= P1WINCHANCE;
    if (result <= P1DRAWCHANCE) {
      stringresult = "p1 draw";
      p1.rating = p1assess.draw;
      p2.rating = p2assess.draw;
      p1.draw += 1;
      p2.draw += 1;
    } else {
      stringresult = "p1 loss";
      p1.rating = p1assess.loss;
      p2.rating = p2assess.win;
      p1.lost += 1;
      p2.won += 1;
    }
  }
}
const whitecount = games.reduce(
  (count, color) => count + (color === "w" ? 1 : 0),
  0,
);
const blackcound = games.length - whitecount;
