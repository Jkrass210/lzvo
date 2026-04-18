export function initSwiper() {
  // Общие параметры для всех слайдеров
  const commonOptions = {};

  // Инициализация всех слайдеров с базовыми параметрами
  const sliders = document.querySelectorAll('.swiper-container');

  sliders.forEach((slider) => {
    // Проверка типа элемента
    if (slider instanceof HTMLElement) {
      // Уникальные параметры для каждого слайдера через класс
      let uniqueOptions = { ...commonOptions };

      if (slider.classList.contains('swiper-decision')) {
        
        uniqueOptions = {
          ...uniqueOptions,
          slidesPerView: 1,
          centeredSlides: true,
          watchSlidesProgress: true,
          //observer: true,
          //observeParents: true,
          effect: 'creative',
          creativeEffect: {
            prev: {
              translate: [0, 8, -200],
              scale: 0.85,
            },
            next: {
              translate: [0, -18, -16],
              scale: 0.99,
            },
          },
          //speed: 600,
          //effect: 'fade',
          /*fadeEffect: {
            crossFade: true
          },*/
          navigation: {
            nextEl: slider.querySelector('.swiper-btn-type-1.--next'),
            prevEl: slider.querySelector('.swiper-btn-type-1.--prev'),
          },
          on: {
            progress(swiper) {
              swiper.slides.forEach(slide => {
                slide.style.setProperty('--swiper-slide-progress', slide.progress);
              });
            },
          },
          
        };
      }

      if (slider.classList.contains('swiper-news')) {
        uniqueOptions = {
          ...uniqueOptions,
          slidesPerView: 1,
          spaceBetween: 16,
          
          breakpoints: {
            650: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            1000: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 24,
            }
          },

          navigation: {
            nextEl: slider.querySelector('.swiper-btn-type-1.--next'),
            prevEl: slider.querySelector('.swiper-btn-type-1.--prev'),
          },
        }
      }

      if (slider.classList.contains('swiper-card-3')) {
        uniqueOptions = {
          ...uniqueOptions,
          slidesPerView: 1,
          spaceBetween: 16,
          
          breakpoints: {
            800: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 24,
            }
          },

          navigation: {
            nextEl: slider.querySelector('.swiper-btn-type-1.--next'),
            prevEl: slider.querySelector('.swiper-btn-type-1.--prev'),
          },
        }
      }

      if (slider.classList.contains('swiper-viewer')) {
        uniqueOptions = {
          ...uniqueOptions,
          slidesPerView: 1,
          spaceBetween: 0,
          observer: true,
          observeParents: true,
          lazy: true,
          pagination: {
            el: slider.querySelector('.swiper-viewer-pagination'),
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
              return `
                <span class="${currentClass}"></span>
                <span class="separator">из</span>
                <span class="${totalClass}"></span>
              `;
            },
          },
          navigation: {
            nextEl: slider.querySelector('.swiper-btn-type-1.--next'),
            prevEl: slider.querySelector('.swiper-btn-type-1.--prev'),
          },
        }
      }

      if (slider.classList.contains('swiper-visual')) {
        uniqueOptions = {
          ...uniqueOptions,
          slidesPerView: 1,
          spaceBetween: 12,
          loop: true,
          //observer: true,
          //observeParents: true,
          lazy: true,
          loopAdditionalSlides: 3,
          initialSlide: 1,
          breakpoints: {
            500: {
              slidesPerView: 1.8,
              spaceBetween: 12,
            },
            800: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 2,
              spaceBetween: 24,
            }
          },
          navigation: {
            nextEl: slider.querySelector('.swiper-btn-type-1.--next'),
            prevEl: slider.querySelector('.swiper-btn-type-1.--prev'),
          },
        }
      }
      

      // Инициализируем слайдер с уникальными параметрами
      const swiper = new Swiper(slider, uniqueOptions);
    }
  });
}