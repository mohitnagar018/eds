import { fetchPlaceholders, getMetadata } from '../../scripts/aem.js';

export default async function decorate(block) {
  // Fetch localized placeholders
  const placeholders = await fetchPlaceholders(getMetadata("locale"));
  const { btnNxt, btnPre } = placeholders;

  console.log("placeholders ---> ", placeholders, btnNxt, btnPre);

  const rows = [...block.children];

  // Loop over children and decorate them
  rows.forEach((row, r) => {
    if (r === 0) {
      // Create Next Button
      const nextBtn = document.createElement('button');
      nextBtn.classList.add('btn', 'btn-next');
      nextBtn.textContent = btnNxt || 'Next';
      row.replaceWith(nextBtn);
    } else if (r === rows.length - 1) {
      // Create Prev Button
      const prevBtn = document.createElement('button');
      prevBtn.classList.add('btn', 'btn-prev');
      prevBtn.textContent = btnPre || 'Previous';
      row.replaceWith(prevBtn);
    } else {
      // Treat as a slide
      row.classList.add('slide');
      [...row.children].forEach((col, c) => {
        if (c === 1) {
          col.classList.add('slide-text');
        }
      });
    }
  });

  // Select elements inside the block
  const slides = block.querySelectorAll(".slide");
  const nextSlideBtn = block.querySelector(".btn-next");
  const prevSlideBtn = block.querySelector(".btn-prev");

  if (slides.length < 2) return; // Nothing to slide

  // Position slides side-by-side
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100}%)`;
  });

  let curSlide = 0;
  const maxSlide = slides.length - 1;

  // Next Slide Logic
  nextSlideBtn?.addEventListener("click", () => {
    curSlide = (curSlide === maxSlide) ? 0 : curSlide + 1;

    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - curSlide)}%)`;
    });
  });

  // Previous Slide Logic
  prevSlideBtn?.addEventListener("click", () => {
    curSlide = (curSlide === 0) ? maxSlide : curSlide - 1;

    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - curSlide)}%)`;
    });
  });
}
