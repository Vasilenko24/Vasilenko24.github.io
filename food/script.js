require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';
     
     import tabs    from './js/modules/tabs';
     import modal   from './js/modules/modal';
     import timer   from './js/modules/timer';
     import cards   from  './js/modules/cards';
     import forms   from './js/modules/forms';
     import calc    from  './js/modules/calc';
     import slider from './js/modules/slider';
     import {openModal} from './js/modules/modal';


window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 5000);

     tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
     modal('[data-modal]', '.modal', modalTimerId);
     timer('.timer', '2020-12-23');
     cards();
     forms('form', modalTimerId);
     calc();
     slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter:  '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        inner: '.offer__slider-inner'

     });

});          