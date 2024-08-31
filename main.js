(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-19",headers:{authorization:"337329cb-3c7c-4e06-8dd9-b4dee464329d","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)},r=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)},o=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)};function c(e,t,n){t.classList.contains("card__like-button_is-active")?o(e).then((function(e){t.classList.remove("card__like-button_is-active"),n.textContent=e.likes.length>0?e.likes.length:"",0===e.likes.length&&n.classList.remove("card__like-counter_is-active")})).catch((function(e){return console.log(e)})):r(e).then((function(e){t.classList.add("card__like-button_is-active"),n.textContent=e.likes.length,n.classList.add("card__like-counter_is-active")})).catch((function(e){return console.log(e)}))}function i(e,t,r){n(t).then((function(){r.remove()})).catch((function(e){return console.log(e)}))}function a(e,t,n,r,o){return function(e,t,n,r,o,c){var i=e.querySelector(".card").cloneNode(!0);i.dataset.cardId=t._id;var a=i.querySelector(".card__image"),u=i.querySelector(".card__title"),s=i.querySelector(".card__like-button"),l=i.querySelector(".card__delete-button"),d=i.querySelector(".card__like-counter");return a.src=t.link,a.alt=t.name,u.textContent=t.name,d.textContent=t.likes.length,t.likes.length>0&&d.classList.add("card__like-counter_is-active"),t.likes.some((function(e){return e._id===c}))&&s.classList.add("card__like-button_is-active"),a.addEventListener("click",(function(){return n(t)})),s.addEventListener("click",(function(){return r(t._id,s,d)})),t.owner._id===c?l.addEventListener("click",(function(e){return o(e,t._id,i)})):l.style.display="none",i}(document.getElementById("card-template").content,e,t,n,r,o)}function u(e){e.target.classList.contains("popup")&&l(e.target)}function s(e){e&&e.classList.contains("popup")&&(e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")}),10),document.addEventListener("keydown",d),e.addEventListener("click",u))}function l(e){e&&e.classList.contains("popup_is-opened")&&(e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",d),e.removeEventListener("click",u),e.addEventListener("transitionend",(function(){e.classList.contains("popup_is-opened")||e.classList.remove("popup_is-animated")}),{once:!0}))}function d(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&l(t)}}function p(e,t){var n=e.closest(t.formSelector).querySelector(".".concat(e.name,"-input-error"));n&&(n.textContent="",n.classList.remove(t.errorClass),e.classList.remove(t.inputErrorClass)),e.setCustomValidity("")}function _(e,t){e.classList.add(t.inactiveButtonClass),e.disabled=!0}function f(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(e){return p(e,t)})),_(r,t)}function m(e,t,n){e.some((function(e){return!e.validity.valid}))?_(t,n):(t.classList.remove(n.inactiveButtonClass),t.disabled=!1)}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var v=document.querySelector(".places__list"),h=document.querySelector(".profile__edit-button"),S=document.querySelector(".popup_type_edit"),b=S.querySelector(".popup__close"),L=document.querySelector(".profile__add-button"),k=document.querySelector(".popup_type_new-card"),q=k.querySelector(".popup__close"),E=document.querySelector(".popup_type_image"),g=E.querySelector(".popup__close"),C=S.querySelector(".popup__form"),x=S.querySelector(".popup__input_type_name"),A=S.querySelector(".popup__input_type_description"),U=document.querySelector(".profile__title"),B=document.querySelector(".profile__description"),w=k.querySelector(".popup__form"),T=k.querySelector(".popup__input_type_card-name"),j=k.querySelector(".popup__input_type_url"),I=document.querySelector(".popup_type_edit-avatar"),O=I.querySelector(".popup__form"),D=I.querySelector(".popup__input_type_url"),P=I.querySelector(".popup__close"),M=document.querySelector(".profile__image"),N=(E.querySelector(".popup__caption"),E.querySelector(".popup__image"),{formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"});function J(e){var t=E.querySelector(".popup__image"),n=E.querySelector(".popup__caption");t.src=e.link,t.alt=e.name,n.textContent=e.name,s(E)}function H(n){n.preventDefault(),w.querySelector(N.submitButtonSelector);var r,o,u={name:T.value,link:j.value};(r=u.name,o=u.link,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:r,link:o})}).then(t)).then((function(e){var t=e.owner._id;v.prepend(a(e,J,c,i,t)),l(k),w.reset(),f(w,N)})).catch((function(e){return console.log(e)}))}Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t,n,r,o,u,s,l,d,p=(s=2,function(e){if(Array.isArray(e))return e}(u=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,i,a=[],u=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);u=!0);}catch(e){s=!0,o=e}finally{try{if(!u&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(s)throw o}}return a}}(u,s)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}(u,s)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),_=p[0],f=p[1];n=(t=_).name,r=t.about,o=t.avatar,U.textContent=n,B.textContent=r,M.style.backgroundImage="url(".concat(o,")"),l=f,d=_._id,l.forEach((function(e){return v.appendChild(function(e,t){return a(e,J,c,i,t)}(e,d))}))})).catch((function(e){return console.log(e)})),h.addEventListener("click",(function(){x.value=U.textContent,A.value=B.textContent,s(S),f(C,N)})),b.addEventListener("click",(function(){return l(S)})),C.addEventListener("submit",(function(n){var r,o;n.preventDefault(),C.querySelector(N.submitButtonSelector),(r=x.value,o=A.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then(t)).then((function(e){U.textContent=e.name,B.textContent=e.about,l(S)})).catch((function(e){return console.log(e)}))})),L.addEventListener("click",(function(){s(k),w.reset(),f(w,N)})),q.addEventListener("click",(function(){return l(k)})),w.addEventListener("submit",H),L.addEventListener("click",(function(){return s(k)})),q.addEventListener("click",(function(){return l(k)})),w.addEventListener("submit",H),g.addEventListener("click",(function(){return l(E)})),M.addEventListener("click",(function(){s(I),O.reset(),f(O,N)})),P.addEventListener("click",(function(){return l(I)})),O.addEventListener("submit",(function(n){var r;n.preventDefault(),O.querySelector(N.submitButtonSelector),(r=D.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then(t)).then((function(e){M.style.backgroundImage="url(".concat(e.avatar,")"),l(I)})).catch((function(e){return console.log(e)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);n.forEach((function(t){t.addEventListener("input",(function(){(function(e,t){var n="";e.validity.valueMissing?n="Вы пропустили это поле.":e.validity.tooShort?n="Должно быть от ".concat(e.minLength," до ").concat(e.maxLength," символов."):e.validity.patternMismatch?n=e.dataset.errorMessage||"Неверный формат.":e.validity.typeMismatch&&(n="url"===e.type?"Введите адрес сайта.":"Введите корректное значение."),e.validity.valid?p(e,t):function(e,t,n){var r=e.closest(n.formSelector).querySelector(".".concat(e.name,"-input-error"));r&&(r.textContent=t,r.classList.add(n.errorClass),e.classList.add(n.inputErrorClass))}(e,n,t)})(t,e),m(n,r,e)}))})),t.addEventListener("submit",(function(e){return e.preventDefault()})),m(n,r,e)}))}(N)})();
