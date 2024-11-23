import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = 'https://localhost:7265/api/transaction';
  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
   // this.headers.append('Content-Type', 'application/json');

  }
  getEncryptionKey(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/encryption-key`);
  }

  processTransaction(encryptedData: string, encryptedKey :string): Observable<any> {
    this.headers.set('encryptionKey', encryptedKey);
    return this.http.post<any>(`${this.baseUrl}/process-transaction`,encryptedData, {headers: this.headers});
  }
}
