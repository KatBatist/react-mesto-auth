import React from 'react';

function PopupWithForm({name, title, buttonText, isOpen, onClose, onSubmit, children}) {
  return (
    <>
      <div className= {isOpen ? `popup popup-${name} popup_opened` : 
        `popup popup-${name}`}>
        <div className="popup__container">
          <h2 className="popup__header">{title}</h2>
          <form className={`form form-${name}`} name={`form-${name}`} onSubmit={onSubmit} noValidate>
            {children}
            <button className="form__submit form__submit_popup" type="submit">{buttonText}</button>
          </form>
          <button className={`popup__close-btn popup-${name}-close`} type="button" onClick={onClose}></button>
        </div>
      </div>
    </>  
  );
}

export default PopupWithForm;      
