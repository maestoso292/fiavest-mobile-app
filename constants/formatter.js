import "intl";
import "intl/locale-data/jsonp/en";

export const currencyFormatter = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "MYR",
});
