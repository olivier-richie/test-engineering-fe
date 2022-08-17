import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: 'table/:id', component: DetailComponent },
  // { path: 'table/', component: TodosComponent },
  // { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailRoutingModule { }
