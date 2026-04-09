import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  host: { class: 'contact-page' }
})
export class Contact {
  formData = { name: '', email: '', subject: '', message: '' };
  loading = false;
  success = false;
  error = '';

  constructor(private contactService: ContactService) {}

  onSubmit(): void {
    this.loading = true;
    this.success = false;
    this.error = '';

    this.contactService.send(this.formData).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
        this.formData = { name: '', email: '', subject: '', message: '' };
      },
      error: () => {
        this.error = 'Failed to send message. Please try again or email us directly at info@gimasl.com';
        this.loading = false;
      }
    });
  }
}
