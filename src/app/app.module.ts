import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MaterialModule } from './material.module';
import { MenuComponent } from './menu/menu.component';
import { QuestionComponent } from './question/question.component';
import { CategoryComponent } from './question/category/category.component';
import { SectionComponent } from './question/section/section.component';
import { HeaderComponent } from './menu/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";

import { CategoryService } from "./shared/category.service";
import { QuestionService } from "./shared/question.service";
import { SectionService } from "./shared/section.service";


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    QuestionComponent,
    CategoryComponent,
    SectionComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,  
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),

  ],
  providers: [QuestionService, SectionService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
