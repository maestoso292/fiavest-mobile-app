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
    blindText,
    uri
  ),
  "0001": new Stock(
    "0001",
    "GOOGLE",
    (Math.random() * 100).toFixed(2),
    blindText,
    uri
  ),
  "0002": new Stock(
    "0002",
    "FACEBOOK",
    (Math.random() * 100).toFixed(2),
    blindText,
    uri
  ),
  "0003": new Stock(
    "0003",
    "AIR ASIA",
    (Math.random() * 100).toFixed(2),
    blindText,
    uri
  ),
  "0004": new Stock(
    "0004",
    "GRAB",
    (Math.random() * 100).toFixed(2),
    blindText,
    uri
  ),
  "0005": new Stock(
    "0005",
    "TIGER",
    (Math.random() * 100).toFixed(2),
    blindText,
    uri
  ),
  "0006": new Stock(
    "0006",
    "MAYBANK",
    (Math.random() * 100).toFixed(2),
    blindText,
    uri
  ),
  "0007": new Stock(
    "0007",
    "SCOMNET",
    (Math.random() * 100).toFixed(2),
    blindText,
    uri
  ),
  "0008": new Stock(
    "0008",
    "VISA",
    (Math.random() * 100).toFixed(2),
    blindText,
    uri
  ),
};
