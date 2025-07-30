import { getMetadata } from '../../scripts/aem.js';

export default function decorate(block) {
  const btnNxt = 'Next'; // Hardcoded or localize this differently
  const btnPre = 'Previous'; // Hardcoded or localize this differently

  const rows = [...block.children];
  [...block.children].forEach((row, r) => {
    if (r === 0) {
      const nextbtn = document.createElement('button');
      nextbtn.classList.add('btn', 'btn-next');
      nextbtn.textContent = btnNxt;
      row.replaceWith(nextbtn);
    } else if (r === rows.length - 1) {
      const prebtn = document.createElement('button');
      prebtn.classList.add('btn', 'btn-prev');
      prebtn.textContent = btnPre;
      row.replaceWith(prebtn);
    } else {
      row.classList.add('slide');
      [...row.children].forEach((col, c) => {
        if (c === 1) {
          col.classList.add('slide-text');
        }
      });
    }
  });

  const slides = document.querySelectorAll('.slide');

  // Set initial slide position
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${indx * 100}%)`;
  });

  let curSlide = 0;
  const maxSlide = slides.length - 1;

  const nextSlide = document.querySelector('.btn-next');
  const prevSlide = document.querySelector('.btn-prev');

  nextSlide?.addEventListener('click', () => {
    curSlide = (curSlide === maxSlide) ? 0 : curSlide + 1;
    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    });
  });

  prevSlide?.addEventListener('click', () => {
    curSlide = (curSlide === 0) ? maxSlide : curSlide - 1;
    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    });
  });
}
