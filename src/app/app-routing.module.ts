import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { QuestionComponent } from './question/question.component';
import { SectionComponent } from './question/section/section.component';
import { CategoryComponent } from './question/category/category.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'question-category', component: CategoryComponent },
  { path: 'question-section', component: SectionComponent },
  { path: 'question', component: QuestionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
