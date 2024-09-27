import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { FormComponent } from './pages/form/form.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
   {
    path: 'nuevaTarea',
    component: FormComponent
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
