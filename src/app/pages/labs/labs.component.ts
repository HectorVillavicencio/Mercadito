import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  title = 'Mercadito';
  tasks = [ 'Inicio',
  'Curso',
  'Proyectos',
  'Final'];

 name= signal('Fabian');
 age = 18;
 persona = {
  edad: 25,
  nombre: 'Julian',
  imagen: 'https://img.freepik.com/foto-gratis/lindo-bebe-erizo-closeup-sobre-musgo-fondo-negro_488145-1549.jpg?w=996&t=st=1706327494~exp=1706328094~hmac=147657ca7a47ebe395784461300fec25be64a726ab41568e49538479fe6dbb31'
 }

 clickHandler(){
  alert("Holitaass")
 }
 changerHandler(event: Event){
    console.log(event);
 }
 

}

