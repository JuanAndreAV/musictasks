import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recomendados',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './recomendados.component.html',
  styleUrl: './recomendados.component.css'
})
export class RecomendadosComponent {
botones: any[] = [
  {
    id: 1,
    name: 'Teoría',
    url: 'https://teoria.com/',
    color: 'bg-blue-500 hover:bg-blue-600',
    
  },
  {
    id: 2,
    name: 'Partituras',
    url: 'https://imslp.org/wiki/Main_Page',
    color: 'bg-green-500 hover:bg-green-600',
    

  },
  {
    id: 3,
    name: 'Eventos',
    url: 'https://www.bratschefest.com/eventos',
    color: 'bg-purple-500 hover:bg-purple-600',
    
  }
];
videosYouTube: any[] = [
  {
    url: "https://www.youtube.com/embed/nCTfS4stScY?si=o8r0bAcp-RZz041v",
    title: 'Viola Iniciación',
  },
  {
    url: "https://www.youtube.com/embed/ffrBxmq19sI?si=7415rNA2q52Pi3Nj",
    title: 'Viola Básico',
  }
]


}
