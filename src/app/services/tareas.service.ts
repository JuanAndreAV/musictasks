import { Injectable, signal, effect, OnInit } from '@angular/core';
import { Tareas } from '../interfaces/tareas';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService  {
  tareasForm = signal<Tareas[]>([]);
  private taskToEditSource = new BehaviorSubject<Tareas | null>(null); //almacena valor y lo emite a quienes se suscriben
  taskToEdit$ = this.taskToEditSource.asObservable();


  constructor() {
    // Inicializa el localStorage si hay datos guardados
    //localStorage.clear()
    const storage = localStorage.getItem('tareas');
    if (storage) {
      const tasks = JSON.parse(storage);
      this.tareasForm.set(tasks);
    }

    // Guardar en localStorage solo cuando haya tareas
    effect(() => {
      const tareas = this.tareasForm();
      localStorage.setItem('tareas', JSON.stringify(tareas));
    });
  }
  

  // Registro de nuevas tareas
  registro(userTarea: Tareas) {
    this.tareasForm.update((tarea) => [...tarea, userTarea]);
  };

  // Eliminar una tarea por ID
  delete(id: number) {
    this.tareasForm.update((task) => task.filter((tarea) => tarea.id !== id));
  };

  selectedTask(task: Tareas){
    this.taskToEditSource.next(task);
  };
  clearSelectedtask(){
    this.taskToEditSource.next(null);
  };

  editTask(userTarea: Tareas){
    this.tareasForm.update(tasks => tasks.map(task => task.id === userTarea.id ? {...task, ...userTarea } : task))//organizar
  };
  
  

  onCheck(index: number) {
    const estado = this.tareasForm().map(tarea =>
      tarea.id === index ? { ...tarea, estado: !tarea.estado } : tarea
    );
    // Actualiza el signal con el nuevo arreglo
    this.tareasForm.set(estado);
  }
  verNotas(){
    alert('hello')
  }
  
}
