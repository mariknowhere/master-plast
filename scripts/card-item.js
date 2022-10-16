let countItems = 0;

const addBasketButton = document.querySelector('#add_item_basket_button');
const itemsBasket = document.querySelector('#items-count');

const priceItem = document.querySelector('#item_price');
const titleItem = document.querySelector('#item_title');
const descriptionItem = document.querySelector('#item_description');

const photoCard = document.querySelector('#photo_cart');


const basketImage = document.querySelector('#basket_image');

addBasketButton.addEventListener('click', () => {
  countItems++;

  let item = {
    title: titleItem.innerHTML,
    price: priceItem.innerHTML,
    description: descriptionItem.innerHTML,
    image: photoCard.src,
    count: countItems,
  }

  let serialObj = JSON.stringify(item);

  localStorage.setItem('basket', serialObj);

  itemsBasket.innerHTML = countItems.toString();
});

basketImage.addEventListener('click', (event) => {
  if (localStorage['basket'] === undefined) {
    alert('Корзина пуста!');
    event.preventDefault();
  } else {
    const { count } = JSON.parse(localStorage.getItem('basket'))

    if (count <= 0) {
      alert('Корзина пуста!');
      event.preventDefault();
    }
  }
})

window.onload = function () {
  if (localStorage.getItem('basket') !== undefined) {
    const { count } = JSON.parse(localStorage.getItem('basket'));

    itemsBasket.innerHTML = count;
    countItems = count
  }
}


