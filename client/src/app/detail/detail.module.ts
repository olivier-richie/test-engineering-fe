import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';



import { DetailRoutingModule } from './detail-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DetailRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule
  ]
})
export class DetailModule { }
