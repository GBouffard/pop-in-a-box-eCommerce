const KartLogic = require("../src/KartLogic");

describe("Kart logic - ", () => {
  beforeEach(() => {
    kartLogic = new KartLogic();
  });

  describe("kart", () => {
    xit("should have no items in the kart by default", () => {});

    xit("should add an item in the kart when clicked", () => {});

    xit("should remove an item from the kart when clicked", () => {});

    xit("should not remove an item from the kart if there are none to remove", () => {});
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
