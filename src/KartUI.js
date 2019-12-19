$(document).ready(() => {
  const shop = new KartLogic();

  $("#add-goku-button").click(() => {
    shop.addItem("Goku");
    console.log(shop.kart);
  });
});
