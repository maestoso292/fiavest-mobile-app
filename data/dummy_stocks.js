import Stock from "../models/Stock";

const blindText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit \
 in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt \
 mollit anim id est laborum.";

const uri =
  "https://assets.cmcmarkets.com/images/fibonacci_swing_trade_example_chart_small.png";

export const STOCKS_DATA = {
  "0000": new Stock(
    "0000",
    "APPLE",
    (Math.random() * 100).toFixed(2),
    (Math.random() * 100).toFixed(2),
    blindText,
  ),
  "0001": new Stock(
    "0001",
    "BANANA",
    (Math.random() * 100).toFixed(2),
    (Math.random() * 100).toFixed(2),
    blindText,
  ),
  "0002": new Stock(
    "0002",
    "TIGER",
    (Math.random() * 100).toFixed(2),
    (Math.random() * 100).toFixed(2),
    blindText,
  ),
  "0003": new Stock(
    "0003",
    "ANDROID",
    (Math.random() * 100).toFixed(2),
    (Math.random() * 100).toFixed(2),
    blindText,
  ),
  "0004": new Stock(
    "0004",
    "GRAB",
    (Math.random() * 100).toFixed(2),
    (Math.random() * 100).toFixed(2),
    blindText,
  ),
  "0005": new Stock(
    "0005",
    "FACEBOOK",
    (Math.random() * 100).toFixed(2),
    (Math.random() * 100).toFixed(2),
    blindText,
  ),
  "0006": new Stock(
    "0006",
    "AIR ASIA",
    (Math.random() * 100).toFixed(2),
    (Math.random() * 100).toFixed(2),
    blindText,
  ),
  "0007": new Stock(
    "0007",
    "GOOGLE",
    (Math.random() * 100).toFixed(2),
    (Math.random() * 100).toFixed(2),
    blindText,
  ),
  "0008": new Stock(
    "0008",
    "MAYBANK",
    (Math.random() * 100).toFixed(2),
    (Math.random() * 100).toFixed(2),
    blindText,
  ),
  "0009": new Stock(
    "0009",
    "VISA",
    (Math.random() * 100).toFixed(2),
    (Math.random() * 100).toFixed(2),
    blindText,
  ),
  "0010": new Stock(
    "0010",
    "PUBLIC BANK",
    (Math.random() * 100).toFixed(2),
    (Math.random() * 100).toFixed(2),
    blindText,
  ),
};
