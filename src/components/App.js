import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import CardDeletePopup from './CardDeletePopup';
import {api} from '../utils/api.js'
import { CurrentUserContext} from '../contexts/CurrentUserContext';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [currentCard, setCurrentCard] = React.useState([])
  const [currentUser, setCurrentUser] = React.useState({});

  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = React.useState(false)

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
      setCurrentUser(userData);
      setCards(cardsData);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  function handleEscClose (e) {
    if (e.key === 'Escape') { 
      closeAllPopups();
    }
  }

  function handleClick(e) {
    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close-btn')) {
      closeAllPopups();
    }
  }

  function subscriptionPopup() {
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('click', handleClick);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsCardDeletePopupOpen(false);
    setSelectedCard({});
    setCurrentCard({});
    document.removeEventListener('keydown', handleEscClose);
    document.removeEventListener('click', handleClick);
  }

  function handleUpdateUser(user) {
    Promise.all([api.setProfileInfo(user.name, user.about)])
    .then(([userData]) => {
      setCurrentUser(userData)
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateAvatar(user, evt) {
    Promise.all([api.setAvatar(user.avatar)])
    .then(([userData]) => {
      setCurrentUser(userData)
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(place) {
    api.setAddCard(place.name, place.link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    }); 
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.setLike(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    }); 
  }

  function handleCardDelete() {
    api.setDeleteCard(currentCard._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== currentCard._id));
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    }); 
  }

  function handleCardDeleteClick(card) {
    setCurrentCard(card);
    setIsCardDeletePopupOpen(true);
    subscriptionPopup();
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    subscriptionPopup();
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    subscriptionPopup();
  };

  function handleAddPlaceClick() { 
    setIsAddPlacePopupOpen(true);
    subscriptionPopup();
  };

  function handleCardClick(card) {
    setSelectedCard(card);
    subscriptionPopup()
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick} 
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeleteClick}/>
        <Footer />
        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups} />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}/>  
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit}/>  
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}/>  
        <CardDeletePopup 
          isOpen={isCardDeletePopupOpen} 
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
