import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  title = 'Mercadito';
  tasks = signal([ 'Inicio',
  'Curso',
  'Proyectos',
  'Final']);

 name= signal('Fabian');
 age = 18;
 persona = signal({
  edad: 17,
  nombre: 'Julian',
  imagen: 'https://img.freepik.com/foto-gratis/lindo-bebe-erizo-closeup-sobre-musgo-fondo-negro_488145-1549.jpg?w=996&t=st=1706327494~exp=1706328094~hmac=147657ca7a47ebe395784461300fec25be64a726ab41568e49538479fe6dbb31'
 });

 clickHandler(){
  alert("Holitaass")
 }

 changerHandler(event: Event){
  const input = event.target as HTMLInputElement;
  const newValue = input.value;
  this.name.set(newValue);
 }

 changeAge(event: Event){
  const input = event.target as HTMLInputElement;
  const newValue = input.value;
  this.persona.update(prevState => {
    return {
      ...prevState,
      edad: parseInt(newValue, 10)
    }
  });
 }
 
 colorCtrl =  new FormControl();
 widthCtrl =  new FormControl(50, {
  nonNullable: true
 });

 nameCtrl =  new FormControl('Victor', {
  nonNullable: true,
  validators: [
    Validators.required,
    Validators.minLength(3)
  ]
 });

constructor(){
  this.colorCtrl.valueChanges.subscribe(value => {
    console.log(value);
  })
}

 changeName(event: Event){
  const input = event.target as HTMLInputElement;
  const newValue = input.value;
  this.persona.update(prevState => {
    return {
      ...prevState,
      nombre: newValue
    }
  });
 }

}

