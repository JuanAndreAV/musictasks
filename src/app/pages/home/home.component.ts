import { Component, computed, signal, inject, effect } from '@angular/core';
import { FormControl, FormGroup,FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { Tareas } from '../../interfaces/tareas';
import { NgClass } from '@angular/common';
import { Event, RouterLink } from '@angular/router';
import { TareasService } from '../../services/tareas.service';
import { FormComponent } from '../form/form.component';
import { AiService } from '../../services/ai.service';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, CdkDropListGroup} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FormsModule, RouterLink, FormComponent, 
     CdkDrag, CdkDropListGroup, CdkDropList],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
//tareas = signal<Tareas[]>([]);
filtro = signal<string>('all');
notas: string | undefined = 'No hay notas registradas'
title: string | undefined = '';
category: string | undefined = '';
enlace :  string | undefined = '';


tareaService = inject(TareasService)
drop(event:  CdkDragDrop<Tareas[]>): void {
  moveItemInArray(this.tareaService.tareasForm(), event.previousIndex, event.currentIndex);

  
  // Luego llamar al método para registrar o guardar el nuevo orden
  //this.tareaService.registro(this.tareaService.tareasForm());
}



// Método que se ejecuta al hacer clic en el botón
// home.component.ts
isFormVisible = false;
isNotesVisible = false;

openTaskForm() {
  this.isFormVisible = true;
  this.isNotesVisible = false;
}

verNotas(id: any) {
  const tarea = this.tareaService.tareasForm().find(t => t.id === id);
  if (tarea) {
    this.title = tarea.title;
    this.category = tarea.category;
    this.notas = tarea.notas || 'No hay notas registradas';
    this.enlace = tarea.enlace;
    this.isNotesVisible = true;
    this.isFormVisible = false;
  }
}

closeNotes() {
  this.isNotesVisible = false;
}
// Mostrar el formulario (modal)
openForm(vista: boolean) {
if(vista){
  this.isFormVisible = true;
}else{
  this.isNotesVisible = true
}
  
}

// Cerrar el formulario (modal)
closeForm(vista: boolean) {
  if(vista){
    this.isFormVisible = false;
  }else{
    this.isNotesVisible = false;
  }
}

constructor(aiService: AiService){
}


renderizado = computed(()=>{
  const tareas = this.tareaService.tareasForm();
  const filtro = this.filtro();

  if (filtro === 'completed') {
    
    return tareas.filter(task=> task.estado)//
  }
  if(filtro === 'pending'){
    return tareas.filter(task=> !task.estado)//
  }
  
  return tareas
  
})
  



setFilter(filter: string){
  this.filtro.set(filter)
  //console.log( this.filtro())
  
}

borrarTarea(id: any){
this.tareaService.delete(id)
};

editTask(tarea: any){
  this.tareaService.selectedTask(tarea)
  this.openForm(true);
};
onCheck(index: any){
  
  this.tareaService.onCheck(index)
  
};
}
