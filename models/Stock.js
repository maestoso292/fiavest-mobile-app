class Stock {
  // TODO chartSrc will need to be replaced depending on how we display the charts/data
  constructor(id, name, price, details, chartSrc) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.details = details;
    this.chartSrc = chartSrc;
  }
}

export default Stock;
