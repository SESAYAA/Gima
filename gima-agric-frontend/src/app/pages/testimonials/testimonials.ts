import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-testimonials',
  imports: [RouterLink],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
  host: { class: 'testimonials-page' }
})
export class Testimonials {}
