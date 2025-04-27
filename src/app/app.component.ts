import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AiService } from './services/ai.service';
import { HeaderComponent } from './pages/shared/header/header.component';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { AssistanceComponent } from './pages/shared/assistance/assistance.component';
import { AiSuggestionsComponent } from './pages/ai-suggestions/ai-suggestions.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AssistanceComponent,AiSuggestionsComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'tareas';
  apiWakeUpService = inject(AiService);
  ngOnInit(): void {
    this.apiWakeUpService.wakeUpApi().subscribe({
      next: () => console.log('API despertada exitosamente (si estaba inactiva).'),
      error: (error) => console.error('Error al intentar despertar la API:', error),
    });
  }
}
