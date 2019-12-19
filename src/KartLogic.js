function KartLogic() {
  this.kart = [
    {
      name: "Goku",
      price: 5,
      quantity: 0,
      twoForOne: true,
      bulkDiscount: false,
      cost: 0
    },
    {
      name: "Naruto",
      price: 20,
      quantity: 0,
      twoForOne: false,
      bulkDiscount: true,
      cost: 0
    },
    {
      name: "Luffy",
      price: 7.5,
      quantity: 0,
      twoForOne: false,
      bulkDiscount: true,
      cost: 0
    }
  ];
  this.totalCost = 0;
}

const calculateItemPrice = ({ price, twoForOne, bulkDiscount }, quantity) => {
  let cost = price * quantity;

  if (twoForOne) {
    cost =
      quantity % 2 === 0 ? cost / 2 : (price * quantity - price) / 2 + price;
  }

  if (bulkDiscount && quantity !== 1) {
    cost -= quantity;
  }
  return cost;
};

const recalculatePrice = kart =>
  kart.reduce((total, { cost }) => total + cost, 0);

KartLogic.prototype.addItem = function(itemName) {
  this.kart = this.kart.map(el =>
    el.name === itemName
      ? {
          ...el,
          ...{
            quantity: el.quantity + 1,
            cost: calculateItemPrice(el, el.quantity + 1)
          }
        }
      : el
  );
  this.totalCost = recalculatePrice(this.kart);
};

KartLogic.prototype.removeItem = function(itemName) {
  this.kart = this.kart.map(el =>
    el.name === itemName && el.quantity !== 0
      ? {
          ...el,
          ...{
            quantity: el.quantity - 1,
            cost: calculateItemPrice(el, el.quantity - 1)
          }
        }
      : el
  );
  this.totalCost = recalculatePrice(this.kart);
};

module.exports = KartLogic;
