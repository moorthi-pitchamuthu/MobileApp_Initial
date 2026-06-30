import { Injectable, inject } from '@angular/core';
import {
  Firestore, collection, doc, getDoc, getDocs,
  addDoc, updateDoc, deleteDoc, query, QueryConstraint,
} from '@angular/fire/firestore';

/**
 * FirebaseService — a thin GENERIC Firestore data-access layer.
 *
 * Use this as the single place that talks to Firestore. Domain services can
 * call these helpers instead of importing Firestore everywhere. All methods are
 * fully implemented but generic — there is NO business logic here.
 *
 * Example:
 *   await fb.add('users', { name: 'Jo' });
 *   const users = await fb.list<AppUser>('users');
 */
@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private fs = inject(Firestore);

  /** Get a single document by id (returns null if missing). */
  async getById<T>(col: string, id: string): Promise<T | null> {
    const snap = await getDoc(doc(this.fs, col, id));
    return snap.exists() ? ({ id: snap.id, ...snap.data() } as T) : null;
  }

  /** List documents in a collection, with optional query constraints. */
  async list<T>(col: string, ...constraints: QueryConstraint[]): Promise<T[]> {
    const ref = collection(this.fs, col);
    const snap = await getDocs(constraints.length ? query(ref, ...constraints) : ref);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }) as T);
  }

  /** Create a document; returns the new id. */
  async add<T extends object>(col: string, data: T): Promise<string> {
    const ref = await addDoc(collection(this.fs, col), data as any);
    return ref.id;
  }

  /** Update fields on an existing document. */
  async update(col: string, id: string, data: Record<string, any>): Promise<void> {
    await updateDoc(doc(this.fs, col, id), data);
  }

  /** Delete a document. */
  async remove(col: string, id: string): Promise<void> {
    await deleteDoc(doc(this.fs, col, id));
  }
}
