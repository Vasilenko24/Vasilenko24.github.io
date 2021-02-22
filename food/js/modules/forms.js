import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
      loading: 'img/form/spinner.svg',
      success: 'Спасибо',
      failure: 'что-то пошло не так'
    }
 
    forms.forEach(item => {
     bindPostData(item);
    })
 
    
 
    function bindPostData(form) {
      form.addEventListener('submit', (e) =>{
        e.preventDefault();
 
        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
        diplay: block;
        margin 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage)
      
 
       const formData = new FormData(form);
 
       const object = {};
       formData.forEach(function(value, key){
         object[key] = value;
       });
 
       postData('http://localhost:3000/requests', JSON.stringify(object))
       .then(data => {
         console.log(data)
           showThanksModal(message.success);
           form.reset();
             statusMessage.remove();
       }).catch(() =>{
         showThanksModal(message.failure);
       }).finally(() =>{
         form.reset();
 
       })
 
      });
    }
    
      function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
 
        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);
 
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
        <div class="modal__close" data-close>x</div>
        <div class="modal__title">${message}</div>
        </div>
        `;
 
        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=>{
          thanksModal.remove();
          prevModalDialog.classList.add('show');
          prevModalDialog.classList.remove('hide');
          closeModal('.modal');
        }, 2000);
      }
      
       fetch(' http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
 
}
export default forms;