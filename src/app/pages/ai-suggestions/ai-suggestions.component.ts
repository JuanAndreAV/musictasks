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
  loading = false
  suggestion = signal('');
  aiService = inject(AiService);
  taskService = inject(TareasService);
  tasks = signal<any>([])

  constructor(){
    this.aiSuggestion()
  }
 aiSuggestion(){
  const storage = this.taskService.tareasForm()
  this.tasks.update(()=> storage.map((task) => task.title ))
   const tareas = this.tasks().join()
  if(storage.length > 0){
    this.aiService.aiAssistance({prompt: tareas})
    .subscribe({
      next: (response)=>{
        this.suggestion.update(()=>response.content[0].text)
        console.log(this.suggestion())
      }
    }
    )
   
    
  }
  //this.aiService.aiAssistance()
 } 
 togleModal(){
    this.isVisible.update(()=> !this.isVisible())
 }
 copyToClipboard(){

 }
 shareOnWhatsApp(){}
}
