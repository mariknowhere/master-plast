const amountItems = document.querySelector('#amount_items');
const totalPrice = document.querySelector('#total_price');

const basketContent = document.querySelector('.content-your-basket');



window.onload = function () {
  if (localStorage['basket']) {

    let { count, price, title, description, image: imagePhoto } = JSON.parse(localStorage.getItem('basket'))
    amountItems.innerHTML = count;

    const priceArray = price.split(' ');
    const priceLength = priceArray.length;
    const priceWithoutRubles = priceArray.slice(0, priceLength - 1).join('');

    totalPrice.innerHTML = (parseInt(priceWithoutRubles) * count).toString();

    for (let i = 0; i < count; i++) {
      let wrapper = document.createElement('div');
      wrapper.classList.add('basket-item');
      wrapper.id = `item-${i+1}`

      let imageWrapper = document.createElement('div');
      let image = document.createElement('img');
      imageWrapper.appendChild(image);
      imageWrapper.classList.add('photo-basket-it');
      image.src = imagePhoto;
      image.alt = 'Item';

      wrapper.appendChild(imageWrapper);

      let textWrapper = document.createElement('div');
      let topic = document.createElement('h2');
      let descriptionText = document.createElement('p');
      textWrapper.classList.add('text-description-cart__basket');

      const dots = '...';

      const titleChanged = title.split('').slice(0, 20);
      titleChanged.push(dots);
      const descriptionChanged = description.split('').slice(0, 55);
      descriptionChanged.push(dots);

      console.log()
      console.log(title)
      topic.innerHTML = titleChanged.join('');
      descriptionText.innerHTML = descriptionChanged.join('');
      textWrapper.appendChild(topic);
      textWrapper.appendChild(descriptionText);

      wrapper.appendChild(textWrapper);

      let priceContent = document.createElement('p');
      priceContent.classList.add('price-basket-item');
      priceContent.innerHTML = price;

      wrapper.appendChild(priceContent);

      let closeIcon = document.createElement('img');
      closeIcon.classList.add('delete-button__basket');
      closeIcon.src = '/img/delit__basket.png';
      closeIcon.id = `${i+1}`
      closeIcon.alt = 'Close'

      wrapper.appendChild(closeIcon);

      basketContent.appendChild(wrapper);
    }

    const allIcons = document.querySelectorAll('.delete-button__basket');

    for (let i = 0; i < allIcons.length; i++) {
      allIcons[i].addEventListener('click', () => {
        const actualItem = document.querySelector(`#item-${allIcons[i].id}`)
        basketContent.removeChild(actualItem);

        const itemNew = {
          title: title,
          price: price,
          image: imagePhoto,
          description: description,
          count: --count,
        }

        const itemNewJSON = JSON.stringify(itemNew);

        localStorage.setItem('basket', itemNewJSON);

        amountItems.innerHTML = count;
        totalPrice.innerHTML = (parseInt(priceWithoutRubles) * count).toString();

      })
    }
  }
}

