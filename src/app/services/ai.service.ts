import { inject, Injectable, signal,  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
  }
 
  
}
