import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {
  private lastId = Math.floor(100000 + Math.random() * 900000);

  generateId(): number {
    this.lastId++;
    return this.lastId;
  }

  generateNumericId(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }
}