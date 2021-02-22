function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, inner}) {


    const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
     prev = document.querySelector(prevArrow),
     next = document.querySelector(nextArrow),
     total = document.querySelector(totalCounter),
     current = document.querySelector(currentCounter),
     slidesWrapper = document.querySelector(wrapper),
     slidesInner = document.querySelector(inner),
     width = window.getComputedStyle(slidesWrapper).width;

 let slideIndex = 1;
 let margin = 0;

 if (slides.length < 10 ) {
   total.textContent = `0${slides.length}`;
   current.textContent = `0${slideIndex}`
 } else {
   total.textContent = slides.length;
   current.textContent = slideIndex;
 }

slidesInner.style.width = 100 * slides.length + '%';
slidesInner.style.display = 'flex';
slidesInner.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';
slides.forEach(slide => {
 slide.style.width = width;
 
});

slider.style.position = 'relative';

const dots = document.createElement('ol'),
      _dots = [];
dots.classList.add('carousel-indicators');
dots.style.cssText = `
 position: absolute;
 right: 0;
 bottom: 0;
 left: 0;
 z-index: 15;
 display: flex;
 justify-content: center;
 margin-right: 15%;
 margin-left: 15%;
 list-style: none;
`;
slider.append(dots);

for(let i = 0; i < slides.length; i++) {
  const dot = document.createElement('li');
  dot.setAttribute('data-slide-to', i + 1);
  dot.style.cssText = `
  box-sizing: content-box;
  flex: 0 1 auto;
  width: 30px;
  height: 6px;
  margin-right: 3px;
  margin-left: 3px;
  cursor: pointer;
  background-color: #fff;
  background-clip: padding-box;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  opacity: .5;
  transition: opacity .6s ease;
  `;
  if (i == 0) {
    dot.style.opacity = 1;
  }
  dots.append(dot);
  _dots.push(dot);
  
}

function deleteNotDigits(str) {
   return +str.replace(/\D/g, '');
}

next.addEventListener('click', () => {
 if(margin == deleteNotDigits(width) * (slides.length - 1)) {
   margin = 0;
 }  else {
   margin += deleteNotDigits(width);
 }
 slidesInner.style.transform = `translateX(-${margin}px)`;

 if (slideIndex == slides.length) {
   slideIndex = 1;
 } else {
   slideIndex ++;
 }
  
 if (slides.length < 10 ){
   current.textContent = `0${slideIndex}`
 } else {
   current.textContent = slideIndex;
 }

 _dots.forEach(dot => dot.style.opacity ='.5');
 _dots[slideIndex - 1].style.opacity = '1';

});

 prev.addEventListener('click', () => {
   if(margin == 0) {
     margin  = deleteNotDigits(width) * (slides.length - 1);
   }  else {
     margin -= deleteNotDigits(width);
   }


 slidesInner.style.transform = `translateX(-${margin}px)`;


 if (slideIndex == 1) {
   slideIndex = slides.length;
 } else {
   slideIndex --;
 }
  
 if (slides.length < 10 ){
   current.textContent = `0${slideIndex}`
 } else {
   current.textContent = slideIndex;
 }


 _dots.forEach(dot => dot.style.opacity ='.5');
 _dots[slideIndex - 1].style.opacity = '1';
});

_dots.forEach(dot => {
 dot.addEventListener('click', (e) =>{
   const slideTo = e.target.getAttribute('data-slide-to');

   slideIndex = slideTo;
   margin = deleteNotDigits(width) * (slideTo - 1);

   slidesInner.style.transform = `translateX(-${margin}px)`;

   if (slides.length < 10 ){
     current.textContent = `0${slideIndex}`
   } else {
     current.textContent = slideIndex;
   }

   _dots.forEach(dot => dot.style.opacity ='.5');
   _dots[slideIndex - 1].style.opacity = '1';

 });
});
} 
export default slider;