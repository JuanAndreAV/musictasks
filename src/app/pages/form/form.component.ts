import { Component, inject, signal, output, Input, OnInit } from '@angular/core';
import { Tareas } from '../../interfaces/tareas';
import { TareasService } from '../../services/tareas.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit  {
  formClosed = output<boolean>();
  mensaje: string = 'Ingresa tu tarea';
  succes: string = '';
  isEditable = signal(false);
  editableTaskId = signal(0)


  // Método para cerrar el formulario
  closeForm(estado: boolean) {
    this.formClosed.emit(estado);
    this.tareaService.clearSelectedtask()
    this.form().reset();
  }
tareaService = inject(TareasService);


  form = signal<FormGroup>(
    new FormGroup({
      tarea: new FormControl('',[Validators.required, Validators.minLength(4)]),
      categoria: new FormControl('Técnica',[Validators.required]),
      notas: new FormControl(''),
      enlace: new FormControl('',[ Validators.pattern('https?://.+')])
    })
  )

  enviarData() {
    const formValue = this.form().value;
  
    if (!this.form().valid) {
      this.mensaje = 'Escribe una tarea válida!';
      return;
    }
  
    if (this.isEditable()) {
      const tareas: Tareas = {
        id: this.editableTaskId(),
        title: formValue.tarea.trim(),
        category: formValue.categoria.trim(),
        notas: formValue.notas?.trim() || '',
        enlace: formValue.enlace?.trim() || '',
        estado: false
      };
      this.tareaService.editTask(tareas);
      this.succes = 'Tarea editada con éxito!';
      this.tareaService.clearSelectedtask();
      this.form().reset();
      this.form().patchValue({ categoria: 'Técnica' }); // set default again
      this.editableTaskId.set(0);
      this.isEditable.set(false);
      setTimeout(() => this.formClosed.emit(false), 1000);
    } else {
      const tareas: Tareas = {
        id: Date.now(),
        title: formValue.tarea.trim(),
        category: formValue.categoria.trim(),
        notas: formValue.notas?.trim() || '',
        enlace: formValue.enlace?.trim() || '',
        estado: false
      };
      this.tareaService.registro(tareas);
      this.succes = 'Registro exitoso!';
      this.form().reset();
      //this.form().patchValue({ categoria: 'Técnica' });
      setTimeout(() => this.formClosed.emit(false), 1000);
    }
  
  }
  
 ngOnInit(): void {
     this.patchValues()
     //this.form().patchValue({ categoria: 'Técnica' });
 };
 patchValues(){
  this.tareaService.taskToEdit$.subscribe(task=>{
    if(task){
      this.editableTaskId.update(()=>task.id!)
      this.form().patchValue({
        tarea: task.title,
        categoria: task.category,
        notas: task.notas,
        enlace: task.enlace
      })
      this.isEditable.update(()=>true);
    }else{
      this.form().reset();
      this.form().patchValue({ categoria: 'Técnica' });
      this.isEditable.set(false);          
      this.editableTaskId.set(0); 
    }
  })
 }

}
