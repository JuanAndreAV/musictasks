import { NgClass } from '@angular/common';
import { Component, signal, inject, computed } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AiService } from '../../../services/ai.service';
import { MarkdownModule } from 'ngx-markdown';



@Component({
  selector: 'app-assistance',
  standalone: true,
  imports: [NgClass, FormsModule, MarkdownModule],
  templateUrl: './assistance.component.html',
  styleUrl: './assistance.component.css'
})
export class AssistanceComponent {
  isChatOpen = false;
  aiService = inject(AiService);
  newMessage = signal('');
  isLoading = signal(false)
  messages = signal( [
    { sender: 'bot', text: '🎵 ¡Hola! Soy tu asistente musical. ¿En qué puedo ayudarte hoy?' }
  ]);
  

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    if (this.newMessage().trim() === '') return;
    
    this.messages.update((message)=>{
      return [...message,{sender: 'user', text: this.newMessage()}]
    });
    this.isLoading.set(true);
    //llamo servicio para interactuar con AI
    this.aiService.aiAssistance({prompt: this.newMessage()})
    .subscribe({
      next: (response) => this.messages.update((message)=>{
        this.isLoading.set(false);

        return [...message, {sender: 'bot', text: response.content[0].text}];
      }), 
      error: () => this.messages.update((message)=>{
        this.isLoading.set(false);
        return [...message,{sender: 'bot', text: 'Lo siento, no pude procesar tu solicitud.'}]
      })
       //console.log(response.content[0].text)
    })
  
    this.newMessage.set('');
  };
}
