const KartLogic = require("../src/KartLogic");

const findItem = (name, kart) => kart.find(el => el.name === name);

describe("Kart logic - ", () => {
  let kartLogic;

  beforeEach(() => {
    kartLogic = new KartLogic();
  });

  describe("kart", () => {
    it("should have no items in the kart by default", () => {
      const zeroItemsKart = kartLogic.kart.filter(item => item.quantity === 0);
      expect(zeroItemsKart).toEqual(kartLogic.kart);
    });

    it("should add an item in the kart when clicked", () => {
      kartLogic.addItem("Goku");
      const gokuData = findItem("Goku", kartLogic.kart);
      expect(gokuData.quantity).toEqual(1);
    });

    it("should remove an item from the kart when clicked", () => {
      kartLogic.addItem("Goku");
      kartLogic.removeItem("Goku");
      const gokuData = findItem("Goku", kartLogic.kart);
      expect(gokuData.quantity).toEqual(0);
    });

    it("should not remove an item from the kart if there are none to remove", () => {
      kartLogic.removeItem("Goku");
      const gokuData = findItem("Goku", kartLogic.kart);
      expect(gokuData.quantity).toEqual(0);
    });
  });

  describe("price", () => {
    xit("should be 0 by default", () => {});

    xit("should update the price when 1 item is added", () => {});

    xit("should apply a two for one discount when an even amount of relevant items are added", () => {});

    xit("should apply a two for one discount when an odd amount of relevant items are added", () => {});
  });

  xit("should apply a bulk discount when relevant items are added", () => {});

  describe("examples kart", () => {
    xit("should should work with example one", () => {});

    xit("should should work with example two", () => {});
  });
});
