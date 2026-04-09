import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { Observable, from, timeout, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private firestore = inject(Firestore);

  send(payload: ContactMessage): Observable<void> {
    const messagesRef = collection(this.firestore, 'contact_messages');
    return from(
      addDoc(messagesRef, {
        ...payload,
        status: 'unread',
        createdAt: serverTimestamp()
      })
    ).pipe(
      timeout(5000),
      map(() => void 0),
      catchError(() => throwError(() => new Error('Request timed out')))
    );
  }
}
