import { Component, computed, signal, inject, effect } from '@angular/core';
import { FormControl, FormGroup,FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { Tareas } from '../../interfaces/tareas';
import { Title } from '@angular/platform-browser';
import { filter, find } from 'rxjs';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TareasService } from '../../services/tareas.service';
import { FormComponent } from '../form/form.component';
import { NotesComponent } from '../notes/notes.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FormsModule, RouterLink, FormComponent, NotesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
//tareas = signal<Tareas[]>([]);
filtro = signal<string>('all');
notas: string | undefined = 'No hay notas registradas'
title: string | undefined = '';

tareaService = inject(TareasService)

isFormVisible = false;
isNotesVisible = false;


// Método que se ejecuta al hacer clic en el botón

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

constructor(){
  // effect(()=>{
  //   const tareas = this.tareas();
  //   localStorage.setItem('tareas', JSON.stringify(tareas));
  // })
 
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
  console.log( this.filtro())
  
}



tareaForm = new FormControl('',[Validators.required, Validators.minLength(4)]);


// agregarTarea(){
//   if(this.tareaForm.valid){
//     const tareas = {
//       id: Date.now(),
//       title: this.tareaForm.value?.trim(),
//       estado: false
     
//     }
//     this.tareas.update((tarea)=>[...tarea, tareas]) 
    
//    this.tareaForm.reset()
//   }
// }

borrarTarea(id: any){
this.tareaService.delete(id)
}

verNotas(id: any){
  const buscarNotas = this.tareaService.tareasForm().find((tarea)=> tarea.notas  === id);
  const notas = buscarNotas?.notas
  const title = buscarNotas?.title
 this.notas = notas;
 this.title = title;
}


// ngOnInit(): void {
//   const storage = localStorage.getItem('tareas');
//     if (storage){
//       const tasks = JSON.parse(storage);
//       this.tareaService.tareasForm.set(tasks)
//     }
    
// }



onCheck(index: any){
  this.tareaService.onCheck(index)
}


}
