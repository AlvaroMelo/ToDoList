import { Injectable } from '@angular/core';
import { Todo } from '../model/todo.interface';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/compat/database';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private db: AngularFireDatabase) {}

  items: Todo[] = [
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
  
  getItems(person: string): Observable<SnapshotAction<Todo>[]> {
    return this.getList(person).snapshotChanges();
  }

  addChoreToList(person: string, chore: Todo) {
    let list = this.getList(person);
    return list.push(chore);
  }

  clearList(path: string) {
    this.getList(path).remove();
  }

  removeItem(path: string) {
    this.getList(path).remove();
  }

  updateCompleted(path: string) {
    let item = this.db.object(path);

    (item.valueChanges() as Observable<Todo>).pipe(take(1)).subscribe(chore => {
      item.update({isCompleted: !chore.isCompleted});
    });

  }

  private getList(path: string): AngularFireList<Todo> {
    return this.db.list(path);
  }
}
