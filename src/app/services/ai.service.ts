import { inject, Injectable, signal,  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AiService  {
  private http = inject(HttpClient);
  aiResponse = signal('');
  private aiUrl = environment.apiUrl; 

  constructor() { }
  aiAssistance(prompt: any){
    return this.http.post<any>(`${this.aiUrl}/music-tasks`,prompt ) 
  };
  
  wakeUpApi(): Observable<any> {
    // Realiza una llamada HEAD a la API. HEAD es más ligero que GET
    // ya que solo recupera los encabezados de la respuesta.
    return this.http.head(this.aiUrl).pipe(
      tap(() => {
        console.log('Llamada de "despertar" a la API realizada.');
      })
      // Puedes agregar manejo de errores aquí si lo deseas
    );
  }
  
}
