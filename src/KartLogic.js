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
}

KartLogic.prototype.addItem = function(itemName) {
  this.kart = this.kart.map(el =>
    el.name === itemName ? { ...el, ...{ quantity: el.quantity + 1 } } : el
  );
};

KartLogic.prototype.removeItem = function(itemName) {
  this.kart = this.kart.map(el =>
    el.name === itemName && el.quantity !== 0
      ? { ...el, ...{ quantity: el.quantity - 1 } }
      : el
  );
};

module.exports = KartLogic;
