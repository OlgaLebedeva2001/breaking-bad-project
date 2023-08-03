/* массив с карточками */
const initialCards = [
  {
    name: 'Я и Джесси',
    link: 'https://breaking-bad.tv/wp-content/uploads/2019/11/breaking-bad.tv-foto8.jpg',
  },
  {
    name: 'Хэнк',
    link: 'https://m.media-amazon.com/images/M/MV5BZDc1MTQwOGMtMjhjZS00YzUwLWE5NDUtM2IxODFkOGIyOTQzXkEyXkFqcGdeQXVyNTU5ODQyNjE@._V1_.jpg',
  },
  {
    name: 'Скайлер',
    link: 'https://img.championat.com/s/1350x900/news/big/v/f/sozdatel-vo-vse-tyazhkie-do-sih-por-ne-ponimaet-pochemu-zriteli-ne-lyubyat-skajler_1661259206516040402.jpg',
  },
  {
    name: 'Смотрю в даль',
    link: 'http://s00.yaplakal.com/pics/pics_original/4/3/1/14169134.jpg',
  },
  {
    name: 'Джесси',
    link: 'https://m.media-amazon.com/images/M/MV5BMjIwMjcwNzgwNF5BMl5BanBnXkFtZTcwNDE2NTc0Mg@@._V1_.jpg',
  },
  {
    name: 'Девушка Джесси',
    link: 'https://i.pinimg.com/originals/88/9c/8f/889c8fbf7d055b73c5b7ac253dcb0ed8.jpg',
  },
];

/* кнопка edit для открытия попапа редактирвоания профиля */
const popupEditButton = document.querySelector('.info__edit-button');

/* кнопка add для открытия попапа редактирвоания профиля */
const popupAddButton = document.querySelector('.profile__add-button');

/* попап редактирвоания профиля */
const editPopup = document.querySelector('.editPopup');
/* попап для добаления карточки */
const addPopup = document.querySelector('.addPopup');

/* кнопка-крестик для закрытия попапа редактирвоания профиля */
const editPopupCloseButton = editPopup.querySelector('.popup__close');
/* кнопка-крестик для закрытия попапа редактирвоания профиля */
const addPopupCloseButton = addPopup.querySelector('.popup__close');

/* форма редактирования профиля */
const editPopupForm = document.querySelector('.editPopup__form');
/* инпуты в форме редактирования профиля */
const editPopupInputName = editPopupForm.querySelector('.popup__input-name');
const editPopupInputAbout = editPopupForm.querySelector('.popup__input-about');

/* форма создания карточки */
const addPopupForm = document.querySelector('.addPopup__form');
/* инпуты в форме создания карточки */
const addPopupInputText = addPopupForm.querySelector('.popup__input-name');
const addPopupInputLink = addPopupForm.querySelector('.popup__input-about');

/* поля профиля с именем и работой */
const nameField = document.querySelector('.info__name');
const aboutField = document.querySelector('.info__about');

/* поля карточки для вставки изображения и текста */
/* const img = document.querySelector('.element__img');
const textImg = document.querySelector('.description__text'); */

/* функция открытия попапа */
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

/* функция закрытия попапа */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

/* слушатель клика для кнопки редактирвоания */
popupEditButton.addEventListener('click', () => {
  openPopup(editPopup);
  editPopupInputName.value = nameField.textContent;
  editPopupInputAbout.value = aboutField.textContent;
});

/* слушатель клика для кнопки добавления карточки */
popupAddButton.addEventListener('click', () => {
  openPopup(addPopup);
});

/* слушатель клика для кнопки закрытия попапа редактирвоания профиля */
editPopupCloseButton.addEventListener('click', () => {
  closePopup(editPopup);
});

/* слушатель клика для кнопки закрытия попапа создания карточки */
addPopupCloseButton.addEventListener('click', () => {
  closePopup(addPopup);
});

/* функция отправки отредактирвоанных данных профиля */
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  nameField.textContent = editPopupInputName.value;
  aboutField.textContent = editPopupInputAbout.value;
  closePopup(editPopup);
}

/* обработчик события submit для отправки формы редактирвоания профиля */
editPopupForm.addEventListener('submit', handleEditFormSubmit);
/* обработчик события submit для отправки формы создания карточки */
addPopupForm.addEventListener('submit', handleAddFormSubmit);

/* Часть с созданием и рендером карточек */

/* контейнер с элементами */
const cardsContainer = document.querySelector('.elements');

/* нужный нам элемент из теплейта */
const cardTemplate = document.querySelector('.cardTemplate').content.querySelector('.element');

/* функция удаления карточки */
function deleteCard(event) {
  /* клик у на всегда событие и по текущему событию мы можем узнать элемент на котором он был */
  event.target.closest('.elements__element').remove();
  /* console.log(event.target.closest('.elements__element')); */
}

/* функция обработчик событий дествий по карточке(по иконке корзины) */
function addCardEventListener(card) {
  const deleteButton = card.querySelector('.element__trash-icon');
  deleteButton.addEventListener('click', deleteCard);
}

/* функция создания карточки */
/* используем деструктуризауию т.е. item={name, link} */
function createCard({ name, link }) {
  /* склонировали всю весртку внутри темплейт элемента */
  const card = cardTemplate.cloneNode(true);
  /* взяли необходимые элементы и вставили в них нужные данные */
  const cardText = card.querySelector('.description__text');
  cardText.textContent = name;
  const cardImage = card.querySelector('.element__img');
  cardImage.src = link;
  cardImage.alt = name;

  cardImage.addEventListener('click', openImgPopup);

  /* удаление карточки */
  addCardEventListener(card);

  return card;
}

/* функция вставки карточки в контейнер */
function addCard(card) {
  cardsContainer.prepend(card);
}

/* функция рендера карточек */
function renderCard() {
  /* прошли по массиву карточек методом forEach */
  initialCards.reverse().forEach((item) => {
    const cardHtml = createCard(item);
    addCard(cardHtml);
  });
}

/* добавление и отправка созданной карточки */
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  /* получаем текст и ссылку из инпутов и передаем в функцию создания карточки*/
  const addPopupInputTextValue = addPopupInputText.value;
  const addPopupInputLinkValue = addPopupInputLink.value;

  const card = {
    name: addPopupInputTextValue,
    link: addPopupInputLinkValue,
  };

  const newCard = createCard(card);

  /* добавление карточки в начало контейнера */
  addCard(newCard);

  closePopup(addPopup);
}
addPopupForm.addEventListener('submit', handleAddFormSubmit);
renderCard();

/* выбираем все лайки */
const toggleButtons = document.querySelectorAll('.description__like');

/* функция лайка */
function toggleLike(event) {
  event.target.classList.toggle('description__like_active');
}
/* вешаем обработчики клика на все лайки */
toggleButtons.forEach((items) => {
  items.addEventListener('click', toggleLike);
});

/* попап изображения */

const imgs = document.querySelectorAll('.element__img');

const imgPopup = document.querySelector('.imgPopup');
const imgContent = imgPopup.querySelector('.imgPopup__img');
const imgCaption = imgPopup.querySelector('.imgPopup__caption');
const closeImgPopup = imgPopup.querySelector('.popup__close');

function openImgPopup(event) {
  openPopup(imgPopup);
  imgContent.src = event.target.src;
  imgContent.alt = event.target.alt;
  imgCaption.textContent = event.target.alt;
}

/* imgs.forEach((items) => {
  items.addEventListener('click', openImgPopup);
}); */

closeImgPopup.addEventListener('click', () => {
  closePopup(imgPopup);
});
