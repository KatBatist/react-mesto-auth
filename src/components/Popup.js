import React from 'react';

function Popup({name, isOpen, onClose, children}) {
  return (
    <>
      <div className= {isOpen ? `popup popup-${name} popup_opened` : 
        `popup popup-${name}`}>
      <div className="popup__container popup__container-message">
        {children}
        <button className={`popup__close-btn popup-message-close`} type="button" onClick={onClose}></button>
      </div>  
    </div> 
    </>  
  );
}

export default Popup;    