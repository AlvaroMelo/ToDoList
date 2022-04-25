import { Component } from '@angular/core';
import { SnapshotAction } from '@angular/fire/compat/database';
import { Observable, Subscription } from 'rxjs';
import { fade, slideFromLeft, strikeThrough, todosAnimation } from '../animations';
import { Todo } from '../model/todo.interface';
import { TodoItem } from '../model/todoItem.interface';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [ slideFromLeft, strikeThrough, fade, todosAnimation ]
})
export class TodosComponent {
  items$!: Observable<SnapshotAction<Todo>[]>;
  items: Todo[] = [];
  itemsMapIndexes: Map <string, number> = new Map<string, number>();
  itemsMapKeys: Map <number, string> = new Map<number, string>();
  person!: string;
  isPersonChanged: boolean = false;
  isLoading: boolean = false;
  itemsSubscription!: Subscription;

  constructor(private todosService: TodosService) { }

  addItem(input: HTMLInputElement) {
    let newValue: Todo = {
      todo: input.value,
      isCompleted: false
    }
    if (/\S/g.test(input.value))
      this.todosService.addChoreToList(this.person, newValue);
    input.value = '';
  }

  removeItem(item: string) {
    let index = this.itemsMapIndexes.get(item) as number;
    let key = this.itemsMapKeys.get(index);
    this.itemsMapKeys.delete(index);
    this.itemsMapIndexes.delete(item);
    this.items.splice(index, 1);
    this.todosService.removeItem(this.person + '/' + key);
  }

  handleItem(item: string) {
    let index = this.itemsMapIndexes.get(item) as number;
    let key = this.itemsMapKeys.get(index);
    this.todosService.updateCompleted(this.person + '/' + key);
  }

  selectedItem(name: string) {
    this.person = name;
    this.items$ = this.todosService.getItems(this.person);

    if (this.itemsSubscription){
      this.itemsSubscription.unsubscribe();
      this.isPersonChanged = true;
    }

    this.itemsSubscription = this.items$.subscribe(listOfItems => {
      if (this.isPersonChanged) {
        this.items = [];
        this.isPersonChanged = false;
        this.itemsMapIndexes.clear();
        this.itemsMapKeys.clear();
      }
      listOfItems.forEach(itemList => {
        let newValue: Todo = {
          todo: itemList.payload.val()?.todo as string,
          isCompleted: itemList.payload.val()?.isCompleted as boolean
        }
        let newValueTodoItem: TodoItem = {
          index: -1,
          key: itemList.key as string
        }

        if (this.itemsMapIndexes.has(newValue.todo)) {
          this.items[this.itemsMapIndexes.get(newValue.todo) as number].isCompleted = newValue.isCompleted;
        } else {
          this.items.push(newValue);
          newValueTodoItem.index = this.items.length - 1
          this.itemsMapIndexes.set(newValue.todo, newValueTodoItem.index)
          this.itemsMapKeys.set(newValueTodoItem.index, newValueTodoItem.key);
        }
      });
    });
  }

  clearList(person: string) {
    this.todosService.clearList(person);
  }

}
