import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
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
    ).pipe(map(() => void 0));
  }
}
