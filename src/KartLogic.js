function KartLogic() {
  this.kart = [
    {
      name: "Goku",
      price: 5,
      quantity: 0,
      twoForOne: true,
      bulkDiscount: false
    },
    {
      name: "Naruto",
      price: 20,
      quantity: 0,
      twoForOne: false,
      bulkDiscount: true
    },
    {
      name: "Luffy",
      price: 7.5,
      quantity: 0,
      twoForOne: false,
      bulkDiscount: true
    }
  ];
  this.price = 0;
}

const recalculatePrice = kart =>
  kart.reduce((total, { name, price, quantity, twoForOne, bulkDiscount }) => {
    let cost = price * quantity;

    if (twoForOne) {
      cost =
        quantity % 2 === 0 ? cost / 2 : (price * quantity - price) / 2 + price;
    }

    if (bulkDiscount) {
      cost -= quantity;
    }

    return total + cost;
  }, 0);

KartLogic.prototype.addItem = function(itemName) {
  this.kart = this.kart.map(el =>
    el.name === itemName ? { ...el, ...{ quantity: el.quantity + 1 } } : el
  );
  this.price = recalculatePrice(this.kart);
};

KartLogic.prototype.removeItem = function(itemName) {
  this.kart = this.kart.map(el =>
    el.name === itemName && el.quantity !== 0
      ? { ...el, ...{ quantity: el.quantity - 1 } }
      : el
  );
  this.price = recalculatePrice(this.kart);
};

module.exports = KartLogic;
