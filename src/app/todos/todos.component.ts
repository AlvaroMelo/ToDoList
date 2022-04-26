import { Component } from '@angular/core';
import { SnapshotAction } from '@angular/fire/compat/database';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { fade, slideFromLeft, todosAnimation } from '../animations';
import { Todo } from '../model/todo.interface';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [slideFromLeft, fade, todosAnimation]
})
export class TodosComponent {
  items$!: Observable<SnapshotAction<Todo>[]>;
  items: Todo[] = [];

  // Mapping Todo -> index
  itemsMapIndexes: Map<string, number> = new Map<string, number>();

  // Mapping index -> firebase key
  itemsMapKeys: Map<number, string> = new Map<number, string>();
  person!: string;
  isPersonChanged: boolean = false;
  isLoading: boolean = false;
  itemsSubscription!: Subscription;

  control = new FormControl('', Validators.required);

  constructor(private todosService: TodosService) { }

  addItem(input: HTMLInputElement) {
    if(!this.itemsMapIndexes.has(input.value) && /\S/g.test(input.value)) {
      let newValue: Todo = {
        todo: input.value,
        isCompleted: false
      }
      this.todosService.addChoreToList(this.person, newValue);
    }
    input.value = '';
  }

  removeItem(item: string) {
    let index = this.itemsMapIndexes.get(item) as number;
    let key = this.itemsMapKeys.get(index);

    // Remove item from map of indexes
    this.itemsMapIndexes.delete(item);

    // Update list of indexes and list of firebase keys
    for (let idx = index + 1; idx < this.itemsMapKeys.size; idx++) {
      let firebaseKey = this.itemsMapKeys.get(idx) as string;
      this.itemsMapKeys.set(idx - 1, firebaseKey);

      let todo = this.items[idx].todo;
      this.itemsMapIndexes.set(todo, idx - 1);
    }

    // Remove key from deleted item
    this.itemsMapKeys.delete(this.items.length - 1);

    // Remove item from TODOS array
    this.items.splice(index, 1);

    // Update firebase database
    this.todosService.removeItem(this.person + '/' + key);
  }

  handleItem(item: string) {
    let index = this.itemsMapIndexes.get(item) as number;
    let key = this.itemsMapKeys.get(index);
    this.todosService.updateCompleted(this.person + '/' + key);
  }

  selectedItem(name: string) {
    this.person = name;

    if (this.person){
      this.items$ = this.todosService.getItems(this.person);

      if (this.itemsSubscription) {
        this.itemsSubscription.unsubscribe();
        this.isPersonChanged = true;
      }

      this.itemsSubscription = this.items$.subscribe(listOfItems => {
        if (this.isPersonChanged) {
          this.clearItems();
        }
        listOfItems.forEach(itemList => this.updateItems(itemList));
      });
    }
  }

  clearItems() {
    this.isPersonChanged = false;
    this.items = [];
    this.itemsMapIndexes.clear();
    this.itemsMapKeys.clear();
  }

  updateItems(itemList: SnapshotAction<Todo>) {
    if (this.itemsMapIndexes.has(itemList.payload.val()?.todo as string)) {
      let index = this.itemsMapIndexes.get(itemList.payload.val()?.todo as string) as number
      this.items[index].isCompleted = itemList.payload.val()?.isCompleted as boolean;
    }
    else {
      this.items.push({
        todo: itemList.payload.val()?.todo as string,
        isCompleted: itemList.payload.val()?.isCompleted as boolean
      });
      this.updateMaps(itemList);
    }
  }

  updateMaps(itemList: SnapshotAction<Todo>) {
    this.itemsMapIndexes.set(itemList.payload.val()?.todo as string, this.items.length - 1)
    this.itemsMapKeys.set(this.items.length - 1, itemList.key as string);
  }

  clearList(person: string) {
    this.todosService.clearList(person);
  }

}
