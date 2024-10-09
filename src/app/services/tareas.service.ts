import { Injectable, signal, effect, OnInit } from '@angular/core';
import { Tareas } from '../interfaces/tareas';

@Injectable({
  providedIn: 'root'
})
export class TareasService  {
  tareasForm = signal<Tareas[]>([]);

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
      if (tareas.length > 0) {
        localStorage.setItem('tareas', JSON.stringify(tareas));
      }
    });
  }
  

  // Registro de nuevas tareas
  registro(userTarea: Tareas) {
    this.tareasForm.update((tarea) => [...tarea, userTarea]);
  }

  // Eliminar una tarea por ID
  delete(id: number) {
    this.tareasForm.update((task) => task.filter((tarea) => tarea.id !== id));
  }
  
  

  onCheck(index: number) {
    const estado = this.tareasForm().map(tarea =>
      tarea.id === index ? { ...tarea, estado: !tarea.estado } : tarea
    );
   
    // Actualiza el signal con el nuevo arreglo
    this.tareasForm.set(estado);
  }
  
}
