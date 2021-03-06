const KartLogic = require("../src/KartLogic");
const chai = require('chai');

const { expect } = chai;

const findItem = (name, kart) => kart.find(el => el.name === name);

describe("Kart logic - ", () => {
  let kartLogic;

  beforeEach(() => {
    kartLogic = new KartLogic();
  });

  describe("kart", () => {
    it("should have no items in the kart by default", () => {
      const zeroItemsKart = kartLogic.kart.filter(item => item.quantity === 0);
      expect(zeroItemsKart).to.eql(kartLogic.kart); // to.eql for deep equality where something like expect([1, 2, 3]).to.equal([1, 2, 3]); // fails
    });

    it("should add an item in the kart when clicked", () => {
      kartLogic.addItem("Goku");
      const gokuData = findItem("Goku", kartLogic.kart);
      expect(gokuData.quantity).to.equal(1);
    });

    it("should remove an item from the kart when clicked", () => {
      kartLogic.addItem("Goku");
      kartLogic.removeItem("Goku");
      const gokuData = findItem("Goku", kartLogic.kart);
      expect(gokuData.quantity).to.equal(0);
    });

    it("should not remove an item from the kart if there are none to remove", () => {
      kartLogic.removeItem("Goku");
      const gokuData = findItem("Goku", kartLogic.kart);
      expect(gokuData.quantity).to.equal(0);
    });
  });

  describe("cost", () => {
    describe("individual cost", () => {
      it("should be 0 by default", () => {
        const gokuData = findItem("Goku", kartLogic.kart);
        expect(gokuData.cost).to.equal(0);
      });

      it("should update the price when 1 item is added", () => {
        kartLogic.addItem("Goku");
        const gokuData = findItem("Goku", kartLogic.kart);
        expect(gokuData.cost).to.equal(gokuData.price);
      });

      it("should apply a two for one discount when an even amount of relevant items are added", () => {
        kartLogic.addItem("Goku");
        kartLogic.addItem("Goku");
        const gokuData = findItem("Goku", kartLogic.kart);
        expect(gokuData.cost).to.equal(gokuData.price);
      });

      it("should apply a two for one discount when an odd amount of relevant items are added", () => {
        kartLogic.addItem("Goku");
        kartLogic.addItem("Goku");
        kartLogic.addItem("Goku");
        const gokuData = findItem("Goku", kartLogic.kart);
        const oddCost =
          (gokuData.price * gokuData.quantity - gokuData.price) / 2 +
          gokuData.price;
        expect(gokuData.cost).to.equal(oddCost);
      });

      it("should apply a bulk discount when relevant items are added", () => {
        for (let i = 0; i < 9; i++) {
          kartLogic.addItem("Naruto");
        }
        const narutoData = findItem("Naruto", kartLogic.kart);
        const bulkedDiscountCost =
          narutoData.price * narutoData.quantity - narutoData.quantity;
        expect(narutoData.cost).to.equal(bulkedDiscountCost);
      });

      it("should not apply a bulk discount even if available when only one item is added", () => {
        kartLogic.addItem("Naruto");
        const narutoData = findItem("Naruto", kartLogic.kart);
        expect(narutoData.cost).to.equal(narutoData.price);
      });
    });

    describe("total cost", () => {
      it("should be 0 by default", () => {
        expect(kartLogic.totalCost).to.equal(0);
      });

      it("should be the sum of the total cost for each item", () => {
        kartLogic.addItem("Goku");
        kartLogic.addItem("Naruto");
        kartLogic.addItem("Luffy");
        expect(kartLogic.totalCost).to.equal(32.5);
      });
    });
  });

  describe("examples kart", () => {
    it("should should work with example one", () => {
      kartLogic.addItem("Goku");
      kartLogic.addItem("Goku");
      kartLogic.addItem("Naruto");
      kartLogic.addItem("Naruto");
      kartLogic.addItem("Naruto");
      expect(kartLogic.totalCost).to.equal(62);
    });

    it("should should work with example two", () => {
      [
        "Goku",
        "Goku",
        "Goku",
        "Goku",
        "Goku",
        "Naruto",
        "Naruto",
        "Naruto",
        "Naruto",
        "Luffy",
        "Luffy",
        "Luffy",
        "Luffy",
        "Luffy",
        "Luffy",
        "Luffy"
      ].forEach(name => kartLogic.addItem(name));
      kartLogic.removeItem("Naruto");
      kartLogic.removeItem("Luffy");
      expect(kartLogic.totalCost).to.equal(117);
    });
  });
});