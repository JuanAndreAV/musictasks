import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';

export const routes: Routes = [
   {
    path: 'categorias',
    component: CategoriasComponent
   },
   {
    path: 'home',
    component: HomeComponent
   },
   {
    path: '',
    component: HomeComponent
   }
];
