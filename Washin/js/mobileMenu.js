const modals = () => {
    function bindModal(triggerSelector, modalSelector, modalContent) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              windows = document.querySelectorAll('[data-side]'),
              content = document.querySelector(modalContent),
              accordion = document.querySelectorAll('.data-drop');
       trigger.forEach(item => {
         
         item.addEventListener('click', (e) =>{
             if(e.target) {
               e.preventDefault();
             }
             accordion.forEach(accord => {
                  if(accord.classList.contains('active-style')) {
                    accord.classList.remove('active-style')
                    accord.nextElementSibling.classList.remove('active-content')
            } 
             })

             item.classList.toggle('active')
             windows.forEach(item => {
               item.style.display = 'none';
             });
             
             modal.style.display = 'block';
             content.classList.add('active-bar');
             document.body.style.overflow = 'hidden';
 
         })
       });

       windows.forEach(item => {
         trigger.forEach(trig => {
           trig.addEventListener('click', () => {
             if(!trig.classList.contains('active')) {
               item.style.display = 'none'
             } 
           })
         })
       })

       

       modal.addEventListener('click', (e) => {
         if(e.target === modal) {
           windows.forEach(item => {
             item.style.display = 'none'
           })
            trigger.forEach(trig => {
                trig.classList.remove('active')
            })
             modal.style.display = 'none';
             document.body.style.overflow = '';
         }
       })
    }
 


    
 
     bindModal('#burger', '.sidebar', '.sidebar-content');

 };
 modals();

 const accordion = (triggersSelector) => {

    const btns = document.querySelectorAll(triggersSelector);

    btns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault()
            this.classList.toggle('active-style')
            this.nextElementSibling.classList.toggle('active-content')
            // if(burger.classList.contains('nav-link', 'active')) {
            //     document.body.style.display = 'none'
            // } 
        })
        
    })

    



};

accordion('.data-drop');