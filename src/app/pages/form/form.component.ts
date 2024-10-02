import { Component, inject, signal, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tareas } from '../../interfaces/tareas';
import { TareasService } from '../../services/tareas.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  formClosed = output<boolean>();
  mensaje: string = 'Ingresa tu tarea';
  succes: string = '';

  // Método para cerrar el formulario
  closeForm(estado: boolean) {
    this.formClosed.emit(estado);
  }
tareaService = inject(TareasService);


  form = signal<FormGroup>(
    new FormGroup({
      tarea: new FormControl('',[Validators.required, Validators.minLength(4)]),
      categoria: new FormControl('tecnica',[Validators.required]),
      notas: new FormControl('')
    })
  )

  enviarData(){
    //this.tareaService.registro(this.form().value)

    if(this.form().valid){
      const tareas = {
        id: Date.now(),
        title: this.form().value?.tarea.trim(),
        category: this.form().value?.categoria.trim(),
        notas: this.form().value?.notas.trim(),
        estado: false
       
      }
      this.tareaService.registro(tareas);
      this.succes = 'Registro exitoso!'
      this.form().reset();
      setTimeout(()=>this.formClosed.emit(false),1000)
      
    }
    this.mensaje = 'Escribe una tarea válida!';

  }

  lectura(){
    console.log(this.form().value)
    this.enviarData()
    //this.formClosed.emit(false)
  }
}
