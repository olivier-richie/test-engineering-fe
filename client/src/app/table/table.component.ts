import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ADD_TODO, DELETE_TODO, GET_TODOS, GET_PEOPLE, GET_ONE_PERSON } from '../graphql/graphql.queries';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from "@angular/router";

@Component({
  selector: 'app-todos',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  todos: any[] = [];
  error: any;

  todoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  displayedColumns: string[] = ['position', 'name', 'height', 'mass', 'gender', 'homeWorld', 'star'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addTodo() {
    // apollo graphql query to add todo
    this.apollo.mutate({
      mutation: ADD_TODO,
      variables: {
        name: this.todoForm.value.name,
        description: this.todoForm.value.description,
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    }).subscribe(({data}: any) => {
      this.todos = data.addTodo;
      this.todoForm.reset();
    }
    , (error) => {
      this.error = error;
    }
    );

  }

  deleteTodo(id: string) {
    // apollo graphql query to delete todo
    this.apollo.mutate({
      mutation: DELETE_TODO,
      variables: {
        id: id,
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    }).subscribe(({data}: any) => {
      this.todos = data.deleteTodo;
    }
    , (error) => {
      this.error = error;
    }
    );
  }

  constructor(private apollo: Apollo,
    private readonly _router: Router) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_PEOPLE
    }).valueChanges.subscribe(({ data, error }: any) => {
      this.todos = data.todos;
      this.error = error;
      this.dataSource = new MatTableDataSource(this.todos);
      this.dataSource.paginator = this.paginator;
      console.log("Result", this.todos)
  }
  );

    this.apollo.watchQuery({
      query: GET_ONE_PERSON,
      variables: {
        id: 1
      }

    }).valueChanges.subscribe(({ data, error }: any) => {
      this.todos = data.todos;
      this.error = error;

      console.log("Result 2", this.todos)
      console.log("Error 2", this.error)
    }
    );


  }

  public async preview(element: any): Promise<void> {
    console.log("Identification", element)
    if (element) {
      await this._router.navigate([`/table/${element.id}`]);
    }
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number
}

