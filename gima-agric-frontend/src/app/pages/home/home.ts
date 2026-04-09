import { Component, AfterViewInit } from '@angular/core';

declare const bootstrap: any;

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
  host: { class: 'index-page' }
})
export class Home implements AfterViewInit {
  ngAfterViewInit(): void {
    setTimeout(() => this.initCarousel(), 200);
  }

  private initCarousel(): void {
    const carouselEl = document.getElementById('hero-carousel');
    if (carouselEl && typeof bootstrap !== 'undefined') {
      new bootstrap.Carousel(carouselEl, { interval: 5000, ride: 'carousel' });
    }
    // Generate indicators
    document.querySelectorAll('.carousel-indicators').forEach((indicator) => {
      const carousel = indicator.closest('.carousel');
      if (!carousel) return;
      const items = carousel.querySelectorAll('.carousel-item');
      indicator.innerHTML = '';
      items.forEach((_, index) => {
        const li = document.createElement('li');
        li.setAttribute('data-bs-target', `#${carousel.id}`);
        li.setAttribute('data-bs-slide-to', String(index));
        if (index === 0) li.classList.add('active');
        indicator.appendChild(li);
      });
    });
  }
}
