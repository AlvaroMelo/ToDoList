import { Component } from '@angular/core';
import { SnapshotAction } from '@angular/fire/compat/database';
import { Observable, Subscription } from 'rxjs';
import { fade, slideFromLeft, strikeThrough, todosAnimation } from '../animations';
import { Todo } from '../model/todo.interface';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [ slideFromLeft, strikeThrough, fade, todosAnimation ]
})
export class TodosComponent {
  items$!: Observable<SnapshotAction<Todo>[]>;
  person!: string;

  constructor(private todosService: TodosService) { }

  addItem(input: HTMLInputElement) {
    let newValue: Todo = {
        todo: input.value,
        isCompleted: false
      };

      this.todosService.addChoreToList(this.person, newValue);
      input.value = '';
    }

  removeItem(item: string) {
    this.todosService.removeItem(this.person + '/' + item);
  }

  handleItem(item: string) {
    this.todosService.updateCompleted(this.person + '/' + item);
  }

  selectedItem(name: string) {
    this.person = name;
    this.items$ = this.todosService.getItems(this.person);
  }

  clearList(person: string) {
    this.todosService.clearList(person);
  }

}
