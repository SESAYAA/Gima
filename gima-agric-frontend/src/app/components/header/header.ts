import { Component, OnInit, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  mobileNavActive = false;

  ngOnInit(): void {}

  @HostListener('window:scroll')
  onScroll(): void {
    const body = document.querySelector('body');
    if (body) {
      window.scrollY > 100 ? body.classList.add('scrolled') : body.classList.remove('scrolled');
    }
  }

  toggleMobileNav(): void {
    this.mobileNavActive = !this.mobileNavActive;
    document.body.classList.toggle('mobile-nav-active', this.mobileNavActive);
  }

  closeMobileNav(): void {
    this.mobileNavActive = false;
    document.body.classList.remove('mobile-nav-active');
  }

  toggleDropdown(event: Event): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    const target = event.target as HTMLElement;
    const parent = target.parentNode as HTMLElement;
    parent.classList.toggle('active');
    const next = parent.nextElementSibling as HTMLElement;
    if (next) next.classList.toggle('dropdown-active');
  }
}
