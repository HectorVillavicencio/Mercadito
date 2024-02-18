import { Component, signal, computed, effect} from '@angular/core';
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
  tasks = signal<Task[]>([]);

  constructor() {
    effect(()=> {
      const tasks = this.tasks();
      console.log(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));

    });
  }

  ngOnInit() {
    const storage = localStorage.getItem('tasks');
    if (storage){
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
  }

  newTaskCtrl = new FormControl('',{ 
    nonNullable: true,
    validators: [
      Validators.required
    ]
    })

  changeHandler(){
    if(this.newTaskCtrl.valid && this.isNotOnlySpace(this.newTaskCtrl)){
      const value = this.newTaskCtrl.value.trim()
      this.addTask(value);
      this.newTaskCtrl.setValue('');
    }
  }

  isNotOnlySpace(form: FormControl){
    return form.value.trim() !== ''
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


  updateTaskEditingMode(index: number){
    this.tasks.update((tasks) => {
      return tasks.map((task, position) =>{
        if(position === index){
          return{
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        };
      })
    })
  }


  updateTaskText(index: number, event: Event){
    const input = event.target as HTMLInputElement
    this.tasks.update((tasks) => {
      return tasks.map((task, position) =>{
        if(position === index){
          return{
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      })
    })
  }

  filter = signal<'all' | 'pending' | 'completed'>('all');
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter(task => !task.completed)
    }
    if (filter === 'completed') {
      return tasks.filter(task => task.completed)
    }
    return tasks;
  })

  changeFilter(filter: 'all' | 'pending' | 'completed'){
    this.filter.set(filter);
  }

}
