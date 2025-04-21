import { inject, Injectable,  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tareas } from '../interfaces/tareas';

@Injectable({
  providedIn: 'root'
})
export class AiService  {
  private http = inject(HttpClient);

  private aiUrl = 'http://localhost:3000/gpt'; 

  constructor() { }
  aiAssistance(prompt: any){
    return this.http.post<any>(`${this.aiUrl}/music-tasks`,prompt )
    .subscribe({
      next: (response) => console.log(response),
    })
  }
 
  
}
