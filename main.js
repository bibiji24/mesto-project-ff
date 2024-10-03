(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,r,o,c,u){var i=t.name,a=t.link,s=e.querySelector(".card").cloneNode(!0),l=s.querySelector(".card__image"),p=s.querySelector(".card__title"),d=s.querySelector(".card__delete-button"),f=s.querySelector(".card__like-button"),_=s.querySelector(".card__like-counts");return l.setAttribute("src",a),l.setAttribute("alt",i),p.textContent=i,t.owner._id===r?d.addEventListener("click",(function(e){o(s,t._id)})):(d.disabled=!0,d.classList.add("card__delete-button_is-hidden")),function(e,t){return t.some((function(t){return t._id===e}))}(r,t.likes)?n(f,_,t.likes.length):_.textContent=t.likes.length,f.addEventListener("click",(function(e){return c(e.target,_,t._id)})),l.addEventListener("click",(function(){return u(i,a)})),s}function n(e,t,n){e.classList.toggle("card__like-button_is-active"),t.textContent=n}function r(e){e.classList.add("popup_is-animated"),setTimeout((function(){return e.classList.add("popup_is-opened")}),0),document.addEventListener("keydown",c)}function o(e){document.removeEventListener("keydown",c),e.classList.remove("popup_is-opened"),setTimeout((function(){return e.classList.remove("popup_is-animated")}),600)}function c(e){"Escape"===e.key&&o(document.querySelector(".popup_is-opened"))}function u(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function i(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function a(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){u(e,o,t),i(n,r,t)}))}var s={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-24",headers:{authorization:"7c1f2dae-1abb-4190-8fa4-da81ed7cd155","Content-Type":"application/json"}};function l(e,t){var n=s.baseUrl,r=s.headers,o="";return t&&(o="/avatar"),fetch("".concat(n,"/users/me").concat(o),{method:"PATCH",headers:r,body:JSON.stringify(e)}).then((function(e){return e.ok?e.json():Promise.reject(e.status)}))}function p(e,t){var n=s.baseUrl,r=s.headers;return fetch("".concat(n,"/cards/likes/").concat(e),{method:t,headers:r}).then((function(e){return e.ok?e.json():Promise.reject(e.status)}))}function d(e){console.log("Error: ".concat(e))}var f,_,m={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},y=document.querySelector(".places__list"),v=document.querySelector(".profile__edit-button"),h=document.querySelector(".profile__add-button"),S=document.querySelector(".profile__title"),b=document.querySelector(".profile__description"),q=document.querySelector(".profile__image"),E=document.querySelector(".popup_type_edit"),k=E.querySelector(".popup__input_type_name"),L=E.querySelector(".popup__input_type_description"),g=document.querySelector(".popup_type_edit .popup__form"),C=document.querySelector(".popup_type_new-card"),x=C.querySelector(".popup__input_type_card-name"),A=C.querySelector(".popup__input_type_url"),j=C.querySelector(".popup__form"),T=document.querySelector(".popup_type_image"),P=document.querySelector(".popup_type_new-avatar"),U=P.querySelector(".popup__form"),w=P.querySelector(".popup__input_type_avatar-link"),B=document.querySelector(".popup_type_confirm"),D=B.querySelector(".popup__button"),M=document.querySelectorAll(".popup__close"),N=document.querySelectorAll(".popup");function O(e){S.textContent=e.name,b.textContent=e.about,q.setAttribute("style","background-image: url(".concat(e.avatar,");"))}function G(e){"Сохранить"===e.textContent?e.textContent="Сохранение...":e.textContent="Сохранить"}function J(e,t){r(B),D.addEventListener("click",(function(){(function(e,t){return function(e){var t=s.baseUrl,n=s.headers;return fetch("".concat(t,"/cards/").concat(e),{method:"DELETE",headers:n})}(t).then((function(){!function(e){e.remove()}(e)})).catch(d)})(e,t).finally((function(){return o(B)}))}))}function V(e,t,r){e.classList.contains("card__like-button_is-active")?p(r,"DELETE").then((function(r){n(e,t,r.likes.length)})).catch(d):p(r,"PUT").then((function(r){n(e,t,r.likes.length)})).catch(d)}function z(e,t){r(T);var n=T.querySelector(".popup__image"),o=T.querySelector(".popup__caption");n.setAttribute("src",t),o.textContent=e}Promise.all([(f=s.baseUrl,_=s.headers,fetch("".concat(f,"/users/me"),{method:"GET",headers:_}).then((function(e){return e.ok?e.json():Promise.reject(e.status)}))),function(){var e=s.baseUrl,t=s.headers;return fetch("".concat(e,"/cards"),{method:"GET",headers:t}).then((function(e){return e.ok?e.json():Promise.reject(e.status)}))}()]).then((function(e){O(e[0]),e[1].forEach((function(n){y.append(t(n,e[0]._id,J,V,z))}))})).catch(d),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);i(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?u(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.classList.add(r.errorClass),o.textContent=n}(e,t,t.validationMessage,n)}(e,o,t),i(n,r,t)}))}))}(t,e)}))}(m),v.addEventListener("click",(function(){k.value=S.textContent,L.value=b.textContent,a(g,m),r(E)})),g.addEventListener("submit",(function(e){e.preventDefault();var t={name:k.value,about:L.value};G(e.target.querySelector("button")),l(t,!1).then(O).catch(d).finally((function(){G(e.target.querySelector("button")),o(E)}))})),h.addEventListener("click",(function(){r(C),j.reset(),a(j,m)})),j.addEventListener("submit",(function(e){e.preventDefault();var n={name:x.value,link:A.value};G(e.target.querySelector("button")),function(e){var t=s.baseUrl,n=s.headers;return fetch("".concat(t,"/cards"),{method:"POST",headers:n,body:JSON.stringify(e)}).then((function(e){return e.ok?e.json():Promise.reject(e.status)}))}(n).then((function(e){var n=t(e,e.owner._id,J,V,z);y.prepend(n)})).catch(d).finally((function(){G(e.target.querySelector("button")),o(C),j.reset()}))})),q.addEventListener("click",(function(){r(P),U.reset(),a(U,m)})),U.addEventListener("submit",(function(e){e.preventDefault();var t={avatar:w.value};G(e.target.querySelector("button")),l(t,!0).then(O).catch(d).finally((function(){G(e.target.querySelector("button")),o(P)}))})),M.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return o(t)}))})),N.forEach((function(e){e.addEventListener("click",(function(e){e.target.classList.contains("popup")&&o(e.target)}))}))})();