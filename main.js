(()=>{"use strict";function e(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}function t(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",e)}function n(t){t.classList.remove("popup_is-opened"),document.removeEventListener("keydown",e)}var o={baseUrl:"https://nomoreparties.co/v1/wff-cohort-11",headers:{authorization:"c86f4c20-586e-4dd7-9d6e-a741f3f74fae","Content-Type":"application/json"}};function r(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var c=document.querySelector("#card-template").content;function a(e,t){(function(e){return fetch("".concat(o.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:o.headers}).then((function(e){return r(e)}))})(e).then((function(){t.remove()})).catch((function(e){console.log(e)}))}function i(e,t,n){var c;n.classList.contains("card__like-button_is-active")?(c=e,fetch("".concat(o.baseUrl,"/cards/likes/").concat(c._id),{method:"DELETE",headers:o.headers}).then((function(e){return r(e)}))).then((function(e){t.textContent=e.likes.length,n.classList.remove("card__like-button_is-active")})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e._id),{method:"PUT",headers:o.headers,body:JSON.stringify(e)}).then((function(e){return r(e)}))}(e).then((function(e){t.textContent=e.likes.length,n.classList.add("card__like-button_is-active")})).catch((function(e){console.log(e)}))}function u(e,t,n){var o=n.deleteCard,r=n.likeCard,a=n.openImagePopup,i=c.querySelector(".places__item").cloneNode(!0),u=i.querySelector(".card__image"),l=i.querySelector(".card__title"),s=i.querySelector(".card__like-button"),d=i.querySelector(".count-like"),f=i.querySelector(".card__delete-button"),p=e.likes.some((function(e){return t===e._id}));return u.src=e.link,u.alt="на фотографии ".concat(e.name),l.textContent=e.name,d.textContent=e.likes.length,p?s.classList.add("card__like-button_is-active"):s.classList.remove("card__like-button_is-active"),s.addEventListener("click",(function(){r(e,d,s)})),t!==e.owner._id?f.remove():f.addEventListener("click",(function(){o(e._id,i)})),u.addEventListener("click",(function(){a(e)})),i}var l={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},s=function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(l.inputErrorClass),n.classList.remove(l.errorClass),n.textContent=""},d=function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t):function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(l.inputErrorClass),o.textContent=n,o.classList.add(l.errorClass)}(e,t,t.validationMessage)},f=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(l.inactiveButtonClass)):(t.disabled=!0,t.classList.add(l.inactiveButtonClass))},p=function(e,t){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);n.forEach((function(e){s(t,e)})),f(n,o)};function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var _=document.querySelector(".places__list"),v=document.querySelectorAll(".popup"),y=document.querySelector(".profile__title"),h=document.querySelector(".profile__description"),b=document.querySelector(".profile__image"),S=document.querySelector(".popup_type_edit"),C=document.querySelector(".profile__edit-button"),k=document.forms["edit-profile"],g=k.name,L=k.description,q=k.button,E=document.querySelector(".profile__image"),x=document.querySelector(".popup_type_update-avatar"),A=document.forms.avatar,w=A.link,U=A.button,O=document.querySelector(".popup_type_new-card"),P=document.querySelector(".profile__add-button"),j=document.forms["new-place"],I=j.elements["place-name"],T=j.elements.link,B=j.button,D=document.querySelector(".popup__image"),N=document.querySelector(".popup__caption"),J=document.querySelector(".popup_type_image"),M=null;function H(e){D.src=e.link,D.alt=e.name,N.textContent=e.name,t(J)}Promise.all([fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers}).then((function(e){return r(e)})),fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers}).then((function(e){return r(e)}))]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],c=o[1];b.style.backgroundImage="url('".concat(r.avatar,"')"),y.textContent=r.name,h.textContent=r.about,M=r._id,c.forEach((function(e){var t={link:e.link,name:e.name,_id:e._id,owner:e.owner,likes:e.likes};_.append(u(t,M,{deleteCard:a,likeCard:i,openImagePopup:H}))}))})).catch((function(e){console.log(e)})),function(e){e.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup__close")&&n(e),t.target.classList.contains("popup_is-opened")&&n(e)}))}))}(v),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);f(n,o),n.forEach((function(e){e.addEventListener("input",(function(){d(t,e),f(n,o)}))}))}(e,t)}))}(l),E.addEventListener("click",(function(){t(x),A.reset(),p(l,A)})),C.addEventListener("click",(function(){t(S),g.value=y.textContent,L.value=h.textContent,p(l,k)})),P.addEventListener("click",(function(){t(O)})),A.addEventListener("submit",(function(e){var t;e.preventDefault(),U.textContent="Сохранить...",(t={avatar:w.value},fetch("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify(t)}).then((function(e){return r(e)}))).then((function(e){b.style.backgroundImage="url('".concat(e.avatar,"')"),n(x),p(l,A)})).catch((function(e){console.log(e)})).finally((function(){U.textContent="Сохранить"}))})),k.addEventListener("submit",(function(e){var t;e.preventDefault(),q.textContent="Сохранить...",(t={name:g.value,about:L.value},fetch("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify(t)}).then((function(e){return r(e)}))).then((function(){y.textContent=g.value,h.textContent=L.value,n(S)})).catch((function(e){console.log(e)})).finally((function(){q.textContent="Сохранить"}))})),j.addEventListener("submit",(function(e){var t;e.preventDefault(),B.textContent="Сохранить...",(t={link:T.value,name:I.value},fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify(t)}).then((function(e){return r(e)}))).then((function(e){_.prepend(u(e,M,{deleteCard:a,likeCard:i,openImagePopup:H})),n(O),j.reset(),p(l,j)})).catch((function(e){console.log(e)})).finally((function(){B.textContent="Сохранить"}))}))})();