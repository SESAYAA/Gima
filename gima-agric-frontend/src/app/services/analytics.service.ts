import { Injectable, inject } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private analytics = inject(Analytics);

  /** Fired when the contact form is successfully submitted */
  trackContactSubmit(subject: string): void {
    logEvent(this.analytics, 'contact_form_submit', { subject });
  }

  /** Fired when the contact form fails */
  trackContactError(): void {
    logEvent(this.analytics, 'contact_form_error');
  }

  /** Generic custom event helper */
  track(eventName: string, params?: Record<string, unknown>): void {
    logEvent(this.analytics, eventName, params);
  }
}
