const sizes = {
  S: 0.75,
  M: 1,
  L: 1.25,
};

function calculTaginePrice(bucks, size) {
  return bucks * sizes[size];
}

export default calculTaginePrice;
