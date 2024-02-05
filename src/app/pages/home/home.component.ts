import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormControl } from '@angular/forms';

import {Task} from './../../Models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([ 
    {
      id: Date.now(),
      title: 'Crear proyecto',
      completed: false
    },
    { 
      id: Date.now(),
      title: 'Crear componentes',
      completed: false
    },
    {      id: Date.now(),
      title: 'Testeando',
      completed: false
    }
  ]);

  changeHandler(){
    if(this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value
      this.addTask(value);
    }
  }

  addTask(title: string){
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    }
    this.tasks.update((tasks) => [...tasks, newTask]);
  }
  
  deleteTask(index : number){
    this.tasks.update((tasks) => tasks.filter((task,position) => position !== index));
  }

  updateTask(index: number){
    this.tasks.update((tasks) => {
      return tasks.map((task, position) =>{
        if(position === index){
          return{
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })
  }

  
  newTaskCtrl = new FormControl('',{ 
    nonNullable: true,
    validators: [
      Validators.required
    ]
    })
}
