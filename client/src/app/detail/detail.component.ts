import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Apollo } from 'apollo-angular';
import {GET_ONE_PERSON } from '../graphql/graphql.queries';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  todos: any;
  error: any;

  constructor(private apollo: Apollo,
    private _location: Location) { }


  ngOnInit(): void {
    var url = window.location.pathname.split("/").pop()
    this.apollo.watchQuery({
      query: GET_ONE_PERSON,
      variables: {
        id: Number(url)
      },
    }).valueChanges.subscribe(({ data, error }: any) => {
      this.todos = data.todo;
      this.error = error;
    }
    );

  }

  backClicked() {
    this._location.back();
  }

}
