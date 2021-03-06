import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Question } from './question.model';
import { QuestionCategory } from './category/question-category.model';
import { QuestionSection } from './section/question-section.model';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore } from "@angular/fire/firestore";

import { CategoryService } from "../shared/category.service";
import { SectionService } from "../shared/section.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questionForm: FormGroup;

  questionTypeKeys: string[] = [];
  isQuestionTypeSelected = false;
  isYesNoQuestion = false;
  numOfAnswer = 0;
  answers: number[] = [];
  categories: QuestionCategory[] = [];
  sections: QuestionSection[] = [];
  sectionSelectDisable = true;

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar, private serviceCategory: CategoryService,
    private serviceSection: SectionService, private firestore: AngularFirestore) {
    this.questionTypeKeys.push("4 ответа");
    this.questionTypeKeys.push("2 ответа");
  }

  ngOnInit() {
    this.questionForm = this.fb.group({
      category: new FormControl(''),
      section: new FormControl(''),
      questionType: new FormControl(null),
      description: new FormControl('', { validators: [Validators.required] }),
      answers: this.fb.array([]),
      correctAnswer: new FormControl(''),
      point: new FormControl(''),
      sectionId: new FormControl('')
    });

    this.getCategories();
  }

  getCategories() {
    this.serviceCategory.getCotegories().subscribe(
      list => {
        this.categories = []
        list.map(item => {
          this.categories.push(new QuestionCategory(item.payload.doc.id, item.payload.doc.get('name')))
        })
      }
    )
  }

  getSectionsByCategory(event) {
    const categoryId: string = event.value;
    // get data from DB by category ID
    this.serviceSection.getSectionsByCategory(categoryId).subscribe(
      list => {
        this.sections = []
        list.map(item => {
          this.sections.push(new QuestionSection(item.payload.doc.id, item.payload.doc.get('name'), item.payload.doc.get('categoryId')))
        })
      }
    )
    this.sectionSelectDisable = false;
  }
  get answersForm() {
    return this.questionForm.get("answers") as FormArray;
  }

  onSave() {
    const question: Question = this.questionForm.value;
    // console.log(question);
    this.firestore.collection('questions').add(question)
    this.questionForm.reset();
    this.openSnackBar('Вопрос успешно сохранено !', '');
  }

  doShowAnswersInput(event) {
    // console.log(event);
    this.isQuestionTypeSelected = true;
    this.numOfAnswer = event.value === "2 ответа" ? 2 : 4;
    this.isYesNoQuestion = event.value === "2 ответа" ? true : false;
    this.initAnswers();
    this.addToFormArray(this.numOfAnswer);
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  initAnswers() {
    this.answers = [];
    for (let i = 0; i < this.numOfAnswer; i++) {
      this.answers.push(i + 1);
    }
  }

  addToFormArray(num: number) {
    this.clearFormArray(this.answersForm);
    if (num === 2) {
      this.answersForm.push(this.fb.group(
        {
          answer: new FormControl('Да')
        }
      ));
      this.answersForm.push(this.fb.group(
        {
          answer: new FormControl('Нет')
        }
      ));
    } else {
      for (let i = 0; i < num; i++) {
        this.answersForm.push(this.fb.group(
          {
            answer: new FormControl('')
          }
        ));
      }
    }

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
