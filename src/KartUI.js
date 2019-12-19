// helpers functions
const findItem = (name, kart) => kart.find(el => el.name === name);

const calculateTotalItems = kart => {
  const numberOfItems = kart.reduce(
    (total, { quantity }) => total + quantity,
    0
  );
  return numberOfItems === 0
    ? "No item"
    : numberOfItems === 1
    ? "1 item"
    : `${numberOfItems} items`;
};

const calculateUndiscountedCost = kart => {
  const undiscounted = kart.reduce(
    (total, { quantity, price }) => total + quantity * price,
    0
  );
  return undiscounted > 0 ? `${undiscounted} €` : "";
};

const offerType = (name, quantity, twoForOne, bulkDiscount) =>
  `${twoForOne ? "2x1 " : ""}${
    bulkDiscount ? `x${quantity} ` : ""
  }${name} POP Offer`;

const displayIndivdualDiscounts = kart => {
  kart.forEach(({ name, price, quantity, twoForOne, bulkDiscount, cost }) => {
    if ((twoForOne || bulkDiscount) && quantity > 1) {
      $(`#${name.toLowerCase()}-discount`).html(`
        <div>
          <div>${offerType(name, quantity, twoForOne, bulkDiscount)}</div>
          <div>${quantity * price - cost}</div>
        </div>
      `);
    }
  });
};

// DOM Manipulation through jQuery
$(document).ready(() => {
  const shop = new KartLogic();
  const shopItemsContainer = $("#shop-items-container");

  $("#total-cost").text(0);
  $("#total-items").text("No item");

  const updateShop = (name, shop, itemQuantityId, itemCostId) => {
    $(`#${itemQuantityId}`).text(findItem(name, shop.kart).quantity);
    $(`#${itemCostId}`).text(findItem(name, shop.kart).cost + " €");
    $("#total-items").text(calculateTotalItems(shop.kart));
    $("#undiscounted-cost").text(calculateUndiscountedCost(shop.kart));
    displayIndivdualDiscounts(shop.kart);
    $("#total-cost").text(shop.totalCost);
  };

  ["Goku", "Naruto", "Luffy"].forEach(name => {
    const lowerName = name.toLowerCase();
    const addButtonId = `add-${lowerName}-button`;
    const removeButtonId = `remove-${lowerName}-button`;
    const itemQuantityId = `${lowerName}-quantity`;
    const selectedItem = findItem(name, shop.kart);
    const itemCostId = `${lowerName}-cost`;

    shopItemsContainer.append(`
      <div>${name}</div>
      <div>
        <button type="button" id="${addButtonId}"> + </button>
        <span id="${itemQuantityId}">${selectedItem.quantity}</span>
        <button type="button" id="${removeButtonId}"> - </button>
      </div>
      <div>${selectedItem.price} €</div>
      <div id="${itemCostId}">${selectedItem.cost}</div>
    `);

    $("#discounted-list").append(`<div id="${lowerName}-discount"></div>`);

    $(`#${addButtonId}`).click(() => {
      shop.addItem(name);
      updateShop(name, shop, itemQuantityId, itemCostId);
    });

    $(`#${removeButtonId}`).click(() => {
      shop.removeItem(name);
      updateShop(name, shop, itemQuantityId, itemCostId);
    });
  });
});
