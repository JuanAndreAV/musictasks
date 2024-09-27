import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup,FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { Tareas } from '../../interfaces/tareas';
import { Title } from '@angular/platform-browser';
import { filter, find } from 'rxjs';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit  {
tareas = signal<Tareas[]>([]);
filtro = signal<string>('all');

renderizado(){
  const tareas = this.tareas();
  const filtro = this.filtro()
  if (filtro === 'completed') {
    
    return tareas.filter(task=> task.estado)//
  }
  if(filtro === 'pending'){
    return tareas.filter(task=> !task.estado)//
  }
  return tareas
}


setFilter(filter: string){
  this.filtro.set(filter)
  console.log( this.filtro())
  
}



tareaForm = new FormControl('',[Validators.required, Validators.minLength(4)]);

constructor(){
  effect(()=>{
    const tareas = this.tareas();
    localStorage.setItem('tareas', JSON.stringify(tareas));
  })
}
agregarTarea(){
  if(this.tareaForm.valid){
    const tareas = {
      id: Date.now(),
      title: this.tareaForm.value?.trim(),
      estado: false
     
    }
    this.tareas.update((tarea)=>[...tarea, tareas]) 
    
   this.tareaForm.reset()
  }
}

borrarTarea(id: any){
  this.tareas.update((task)=>task.filter(task => task.id !== id))
}

ngOnInit(): void {
  const storage = localStorage.getItem('tareas');
    if (storage){
      const tasks = JSON.parse(storage);
      this.tareas.set(tasks)
    }
    
}

onCheck(index: any){

 // const state = this.tareas().filter((i)=> i.id === index )[0].estado
  
  const estado = this.tareas().map(tarea => tarea.id === index ? {...tarea, estado: !tarea.estado} : tarea);


  this.tareas.set(estado)
  

}



}
