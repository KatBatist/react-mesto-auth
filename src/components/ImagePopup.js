import React from 'react';

function ImagePopup({card, onClose}) {
  
  const isCard = Object.keys(card).length !== 0; 

  return (
    <>
      <div className={`popup popup-card ${isCard && 'popup_opened'}`}>
        <figure className="popup-card__figure">
          <img className="popup-card__image" alt={card.name} src={card.link}/>
          <figcaption className="popup-card__caption">{card.name}</figcaption>
          <button className="popup__close-btn popup-card-close" type="button" onClick={onClose}></button>
        </figure>
      </div>
    </>
  );
}

export default ImagePopup;
