import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http: HttpClient = inject(HttpClient);

  public async get<T>(url: string, options?: object): Promise<T> {
    return firstValueFrom(this.http.get<T>(url, options));
  }

  public async post<T>(url: string, body: any, options?: object): Promise<T> {
    return firstValueFrom(this.http.post<T>(url, body, options));
  }

  public async put<T>(url: string, body: any, options?: object): Promise<T> {
    return firstValueFrom(this.http.put<T>(url, body, options));
  }

  public async delete<T>(url: string, options?: object): Promise<T> {
    return firstValueFrom(this.http.delete<T>(url, options));
  }

  private handleError(error: HttpErrorResponse): never {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}
