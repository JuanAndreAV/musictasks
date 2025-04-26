import { Component, inject, OnInit, signal,  } from '@angular/core';
import { AiService } from '../../services/ai.service';
import { TareasService } from '../../services/tareas.service';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-ai-suggestions',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './ai-suggestions.component.html',
  
})
export class AiSuggestionsComponent   {
  isVisible = signal(false);
  isLoading = signal(false);
  suggestion = signal('');
  emptyText = signal('');
  aiService = inject(AiService);
  taskService = inject(TareasService);
  tasks = signal<any>([])

  constructor(){
    this.aiSuggestion()
  }
  
 aiSuggestion(){
  const storage = this.taskService.tareasForm();
  this.tasks.update(()=> storage.map((task) => task.title ));
  const tareas = this.tasks().join();
  this.suggestion.update(()=>'')
  if(storage.length > 0){
    this.isLoading.set(true);
    this.aiService.aiAssistance({prompt: tareas})
    .subscribe({
      next: (response)=>{
        this.isLoading.set(false)
        this.suggestion.update(()=>response.content[0].text) 
      },
      error: ()=>{
        this.isLoading.set(false);
        this.suggestion.update(()=>'Inténtalo nuevamente, no pude procesar tu solicitud.')
      }
    }) 
  }else{
    this.emptyText.update(()=>'Debes ingresar tareas para activar esta función')
  }
 } 
 togleModal(){
    this.isVisible.update(()=> !this.isVisible())
 }
 copyToClipboard(){

 }
 shareOnWhatsApp(){}
}
