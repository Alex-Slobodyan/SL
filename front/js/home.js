
import '../css/index.css';
import has_class from './services/has-class';
import { $getAll, $get } from './services/get-html-element';

const   slides          = $getAll('.slider-content__item'),
        controls        = $getAll('.slider-control__item'),
        slider_control  = $get('.slider-control'),
        slider_content  = $get('.slider-content'),
        class_name = {
            slide:      'slider-content__item--showing',
            control:    'slider-control__item--showing'
        };

let currentSlide = 0;

const toggleClassItem = (item) => {
    slides[item].classList.toggle(class_name.slide);
    controls[item].classList.toggle(class_name.control);
};

slider_control.addEventListener('click', ({target}) => {
    if (has_class(target, 'slider-control__item')) {
        toggleClassItem(currentSlide);
        currentSlide = target.getAttribute('data-currentSlide');
        toggleClassItem(currentSlide);
    };
});

slider_content.addEventListener('click', ({target}) => {
    if(has_class(target, 'slider-content__nav--right')) {
        toggleClassItem(currentSlide);
        currentSlide = (currentSlide+1)%slides.length;
        toggleClassItem(currentSlide);

    }
});

slider_content.addEventListener('click', ({target}) => {
    if(has_class(target, 'slider-content__nav--left')) {
        if(currentSlide == 0) {
            toggleClassItem(currentSlide);
            currentSlide = slides.length - 1;
            toggleClassItem(currentSlide);
        } else {
            toggleClassItem(currentSlide);
            currentSlide = (currentSlide-1)%slides.length;
            toggleClassItem(currentSlide);
        }        
    }
})
