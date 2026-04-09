import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

declare const GLightbox: any;

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
  host: { class: 'about-page' }
})
export class About implements AfterViewInit {
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (typeof GLightbox !== 'undefined') {
        GLightbox({ selector: '.glightbox' });
      }
    }, 200);
  }
}
