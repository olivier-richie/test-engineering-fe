import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component'
import { TableComponent } from "./table/table.component"

const routes: Routes = [
 { path: 'table/:id', component: DetailComponent },
 { path: "", component: TableComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
