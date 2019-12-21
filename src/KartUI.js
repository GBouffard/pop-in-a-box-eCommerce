const ghPagesUrl = 'https://gbouffard.github.io/pop-in-a-box-eCommerce';

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

const calculateUndiscounted = kart =>
  kart.reduce((total, { quantity, price }) => total + quantity * price, 0);

const calculateUndiscountedCost = kart => {
  const undiscounted = calculateUndiscounted(kart);
  return undiscounted > 0 ? `${undiscounted} €` : "";
};

const offerType = (name, quantity, twoForOne, bulkDiscount) =>
  `${twoForOne ? "2x1 " : ""}${
    bulkDiscount ? `x${quantity} ` : ""
  }${name} POP Offer`;

const displayIndivdualDiscounts = (kart, totalCost) => {
  const shouldDisplay = calculateUndiscounted(kart) - totalCost > 0;

  if (shouldDisplay) {
    $("#discout-display").css("visibility", "visible");

    kart.forEach(({ name, price, quantity, twoForOne, bulkDiscount, cost }) => {
      if ((twoForOne || bulkDiscount) && quantity > 1) {
        $(`#${name.toLowerCase()}-discount`).css("display", "block").html(`
        <div class="shop__summary__spacer individual-discount">
          <div>${offerType(name, quantity, twoForOne, bulkDiscount)}</div>
          <div class="bold">- ${quantity * price - cost} €</div>
        </div>
      `);
      } else {
        $(`#${name.toLowerCase()}-discount`).css("display", "none");
      }
    });
  } else {
    $("#discout-display").css("visibility", "hidden");
  }
};

// DOM Manipulation through jQuery
$(document).ready(() => {
  const shop = new KartLogic();
  const shopItemsContainer = $("#shop__items-container");

  $("#total-cost").text(`0 €`);
  $("#total-items").text("No item");
  $("#discout-display").css("visibility", "hidden");

  const updateShop = (name, shop, itemQuantityId, itemCostId) => {
    $(`#${itemQuantityId}`).text(findItem(name, shop.kart).quantity);
    $(`#${itemCostId}`).text(findItem(name, shop.kart).cost + " €");
    $("#total-items").text(calculateTotalItems(shop.kart));
    $("#undiscounted-cost").text(calculateUndiscountedCost(shop.kart));
    displayIndivdualDiscounts(shop.kart, shop.totalCost);
    $("#total-cost").text(shop.totalCost + " €");
  };

  ["Goku", "Naruto", "Luffy"].forEach(name => {
    const lowerName = name.toLowerCase();
    const addButtonId = `add-${lowerName}-button`;
    const removeButtonId = `remove-${lowerName}-button`;
    const itemQuantityId = `${lowerName}-quantity`;
    const selectedItem = findItem(name, shop.kart);
    const itemCostId = `${lowerName}-cost`;

    shopItemsContainer.append(`
      <div class="item-box">
        <img class="item-image" src="${ghPagesUrl}/assets/images/${lowerName}.jpg">
        <div class="item-description">
          <div class="item-description__title">${name} POP</div>
          <div class="item-description__text">Produit code ${name
            .toUpperCase()
            .substr(0, 4)}</div>
        </div>
      </div>
      <div class="justify-align-centered">
        <div id="${removeButtonId}" class="item-button"> - </div>
        <span id="${itemQuantityId}">${selectedItem.quantity}</span>
        <div id="${addButtonId}" class="item-button"> + </div>
      </div>
      <div class="justify-align-centered">${selectedItem.price} €</div>
      <div id="${itemCostId}" class="justify-align-centered">${
      selectedItem.cost
    }</div>
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

  $(`#checkout-button`).click(() =>
    window.alert("The checkout button does not work \nThis is a fake cart!")
  );
});
