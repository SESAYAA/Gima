import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { filter } from 'rxjs/operators';

declare const AOS: any;
declare const GLightbox: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
      setTimeout(() => this.initPlugins(), 100);
    });
    setTimeout(() => this.initPlugins(), 300);
  }

  private initPlugins(): void {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
    }
    if (typeof GLightbox !== 'undefined') {
      GLightbox({ selector: '.glightbox' });
    }
    this.initCarouselIndicators();
    this.initScrollTop();
    this.removePreloader();
  }

  private initCarouselIndicators(): void {
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

  private initScrollTop(): void {
    const scrollTopBtn = document.querySelector('.scroll-top') as HTMLElement;
    if (!scrollTopBtn) return;
    const toggle = () => {
      window.scrollY > 100
        ? scrollTopBtn.classList.add('active')
        : scrollTopBtn.classList.remove('active');
    };
    window.addEventListener('scroll', toggle);
    toggle();
    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  private removePreloader(): void {
    const preloader = document.querySelector('#preloader') as HTMLElement;
    if (preloader) preloader.remove();
  }
}
