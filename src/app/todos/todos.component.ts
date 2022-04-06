import { Component } from '@angular/core';
import { fade, slideFromLeft, strikeThrough, todosAnimation } from '../animations';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [ slideFromLeft, strikeThrough, fade, todosAnimation ]
})
export class TodosComponent {
  items = [
    {
      todo: 'Wash the dishes',
      isCompleted: false
    },
    {
      todo: 'Call the accountant',
      isCompleted: false
    }, 
    {
      todo: 'Apply for a car insurance',
      isCompleted: false
    }];

  addItem(input: HTMLInputElement) {
    let newValue = {
      todo: input.value,
      isCompleted: false
    }
    this.items.splice(0, 0, newValue);
    input.value = ''; 
  }

  removeItem(item: any) {
    let index = this.items.indexOf(item);
    this.items.splice(index, 1);
  }

  handleItem(item: any) {
    let index = this.items.indexOf(item);
    this.items[index].isCompleted = !this.items[index].isCompleted;

  }
}
