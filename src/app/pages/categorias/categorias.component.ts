import { Component, inject, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgClass } from '@angular/common';
import { TareasService } from '../../services/tareas.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormControl, FormsModule, NgModel } from '@angular/forms';
import { FormComponent } from '../form/form.component';
@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [RouterLink, DragDropModule, NgClass, FormsModule],

  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {
  filtro = signal<string>('all');
  notas: string | undefined = 'No hay notas registradas'
  title: string | undefined = '';
  category: string | undefined = '';
  selectedCategory = signal<string>('tecnica');

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
    const filtro = this.selectedCategory();
    console.log(tareas)
    if (filtro === 'tecnica') {
      
      return tareas.filter(task=> task.category === 'Técnica')//
    }
    if(filtro === 'repertorio'){
      return tareas.filter(task=> task.category === 'Repertorio')//
    }
    if(filtro === 'ensayo'){
      return tareas.filter(task=> task.category === 'Ensayo')//
    }
    
    return tareas.filter(task=> task.category === 'Composición')
    
  })
    

  
  setFilter(filter: string){
    this.filtro.set(filter)
    console.log( this.filtro())
    
  }
  
  
  borrarTarea(id: any){
  this.tareaService.delete(id)
  }
  
  verNotas(id: any){
    const buscarNotas = this.tareaService.tareasForm().find((tarea)=> tarea.title  === id);
    const notas = buscarNotas?.notas
    const title = buscarNotas?.title
    const categoria = buscarNotas?.category
   this.notas = notas;
   this.title = title;
   this.category = categoria;
  }
  
  onCheck(index: any){
    this.tareaService.onCheck(index)
    
  }
  
}
