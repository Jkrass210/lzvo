import { testWebP } from './module/testWebP.js';
import { initMobileMenu } from './module/initMobileMenu.js';
import { initCookiesModal } from './module/initCookiesModal.js';
import { counterAnim } from './module/counterAnim.js';
import { initSwiper } from './module/swiper.js';
import { initScrollLinks } from './module/initScrollLinks.js';
import { initTabsType1 } from './module/initTabsType1.js';
import { video } from './module/video.js';
import { initModal } from './module/initModal.js';
import { initVideoIframeLoader } from './module/initVideoIframeLoader.js';
import { initValid } from './module/initValid.js';

testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp');
    console.log("выполнился webp")
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});

if(document.querySelector('.header-menu')) {
  initMobileMenu();
}

if(document.querySelector('.cookie')) {
  initCookiesModal();
}

if (document.querySelectorAll('.counter').length) {
  counterAnim()
}

if (document.querySelectorAll('.swiper-container').length) {
  initSwiper()
}

if(document.querySelectorAll('.js-scroll-link').length) {
  initScrollLinks();
}

if (document.querySelectorAll('.js-tabs-type-1').length) {
  (function () {
    document.addEventListener('DOMContentLoaded', () => {
      initTabsType1();
    });
  })();
}

if (document.querySelectorAll('.js-video-wrapp').length) {
  (function () {
    document.addEventListener('DOMContentLoaded', () => {
      video();
    });
  })();
}

if (document.querySelectorAll('.modal').length) {
  (function () {
    document.addEventListener('DOMContentLoaded', () => {
      initModal();
    });
  })();
}

if (document.querySelectorAll('.js-open-video-iframe').length) {
  (function () {
    document.addEventListener('DOMContentLoaded', () => {
      initVideoIframeLoader();
    });
  })();
}

if (document.querySelectorAll('.js-form').length) {
  (function () {
    document.addEventListener('DOMContentLoaded', () => {
      initValid();
    });
  })();
}

