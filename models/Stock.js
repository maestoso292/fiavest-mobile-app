class Stock {
  // TODO chartSrc will need to be replaced depending on how we display the charts/data
  constructor(id, name, price, volume, details) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.volume = volume;
    this.details = details;
  }
}

export default Stock;
