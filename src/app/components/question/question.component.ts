import { Component } from '@angular/core';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { QuestionService } from 'src/app/services/detailed-form/question/question.service';
import { Question } from 'src/app/models/question';
import { DataquestHeaderComponent } from '../header/dataquest-header/dataquest-header.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from './type/table/table.component';
import { TypeComponent } from './type/type.component';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AnswerRelationService } from 'src/app/services/detailed-form/question/answer-relation/answer-relation.service';
import { DraftService } from 'src/app/services/draft/draft.service';
import { DetailedFormService } from 'src/app/services/detailed-form/detailed-form.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    TypeComponent,
    TableComponent,
    DataquestHeaderComponent,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class QuestionComponent {
  currentQuestion!: Question;
  formGroup!: FormGroup;
  disabled: boolean = false;

  constructor(
    private draftService: DraftService,
    private detailedFormService: DetailedFormService,
    private questionService: QuestionService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private answerRelationService: AnswerRelationService,
    private platform: Platform,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentQuestion = this.questionService.getFirst();
    this.formGroup = this.questionService.getFormGroup();
    if (this.isSurvey()) {
      this.disabled = true;
    }
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.confirmExit();
    });
  }

  async confirmExit() {
    const alert = await this.alertController.create({
      header: '¿Desea salir?',
      message: 'Si sale, su progreso se guardará como borrador.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Salir',
          role: 'confirm',
          cssClass: 'danger',
          handler: () => {
            this.router.navigate(['/home'])
          }
        },
      ],
    });

    await alert.present();
  }

  ionViewWillLeave() {
    this.confirmExit();
  }

  nextQuestion(): void {
    if (this.isQuestionValid()) {
      this.saveResponse(this.currentQuestion, this.formGroup);
      this.draftService.saveDrafts();
      this.currentQuestion = this.getNextQuestionFrom(this.currentQuestion);
      if (this.currentQuestion.question_category.name === 'Capital social individual') {
        this.alertController.create({
          header: 'Atención',
          subHeader: 'Capital social individual',
          message: 'A continuación, pasamos a las preguntas que corresponden al componente del capital social individual del índice de desarrollo socio-organizacional.',
          buttons: ['OK']
        }).then(alert => alert.present());
      }
    } else {
      const type: string = this.currentQuestion.type;
      const isTable: boolean = type === 'Tabla';
      this.presentAlert(isTable);
    }
  }

  previousQuestion(): void {
    this.currentQuestion = this.getPreviousQuestionFrom(this.currentQuestion);
  }

  async presentAlert(isTable: boolean) {
    const tableMessage: string =
      'Por favor, responda todas las preguntas de las secciones para continuar.';
    const genericMessage: string =
      'Por favor, responda la pregunta para continuar.';
    const alert = await this.alertController.create({
      header: 'Pregunta requerida',
      message: isTable ? tableMessage : genericMessage,
      buttons: ['OK'],
    });

    await alert.present();
  }

  onSubmit() {
    if (this.isValid()) {
      this.saveResponse(this.currentQuestion, this.formGroup);
      this.detailedFormService.saveSurvey();
      this.navCtrl.pop();
    } else {
      this.presentAlert(false);
    }
  }

  getCategory(): string {
    return this.currentQuestion.question_category.name;
  }

  getType(): string {
    return this.currentQuestion.type;
  }

  private isQuestionValid() {
    return this.formGroup.controls[this.currentQuestion.id].valid;
  }

  private isValid() {
    return this.formGroup.valid;
  }

  isLastQuestion(): boolean {
    let question: Question = this.currentQuestion;
    let lastQuestion: Question = this.questionService.getLast();
    return question.id === lastQuestion.id;
  }

  isFirstQuestion(): boolean {
    let question: Question = this.currentQuestion;
    let firstQuestion: Question = this.questionService.getFirst();
    return question.id === firstQuestion.id;
  }

  private saveResponse(question: Question, formGroup: FormGroup): void {
    switch (question.type) {
      case 'Abierta':
        this.saveOpenResponse(question, formGroup);
        break;
      case 'Tabla':
        this.saveTableResponse(question, formGroup);
        break;
      default:
        const questionFormGroup: FormGroup = formGroup.controls[
          question.id
        ] as FormGroup;
        this.saveSelection(question, questionFormGroup);
    }
    this.detailedFormService.updateModifyDate();
  }

  private saveTableResponse(question: Question, formGroup: FormGroup) {
    let questionFormArray: FormArray = formGroup.controls[
      question.id
    ] as FormArray;
    this.currentQuestion.questionChildren.forEach((section, index) => {
      let sectionFormGroup: FormGroup = questionFormArray.at(
        index
      ) as FormGroup;
      section.forEach((child) => {
        this.saveResponse(child, sectionFormGroup);
      });
    });
  }

  private saveSelection(question: Question, answersFormGroup: FormGroup) {
    question.answers.forEach((answer) => {
      const value: boolean =
        answersFormGroup.controls[answer.id.toString()].value;
      answer.checked = value;
    });
    if (
      question.type === 'Múltiple respuesta con otro' ||
      question.type === 'Única respuesta con otro'
    ) {
      const textAnswered: string = answersFormGroup.controls['other'].value;
      const fullSavedString: string =
        question.answers[question.answers.length - 1].value;
      const savedStringArray: string[] = fullSavedString.split(':');

      if (savedStringArray.length === 2) {
        savedStringArray[1] = textAnswered;
      } else {
        savedStringArray.push(textAnswered);
      }
      question.answers[question.answers.length - 1].value =
        savedStringArray.join(':');
      console.log(question.answers[question.answers.length - 1].value);
    }
  }

  private saveOpenResponse(question: Question, formGroup: FormGroup) {
    if (question.dataType === 'tel') {
      let answersGroup: FormGroup = formGroup.controls[
        question.id
      ] as FormGroup;
      question.answers.forEach((answer) => {
        const value: string = answersGroup.controls[answer.order].value;
        answer.value = value;
      });
    } else {
      let formResponse = formGroup.controls[question.id].value;
      let answer = question.answers[0];
      answer.value = formResponse;
    }
  }

  private getNextQuestionFrom(question: Question): Question {
    const nextQuestion: Question = this.questionService.nextQuestion(question);
    const formGroup: FormGroup = this.formGroup;
    const checkedAnswersRelation: boolean =
      this.answerRelationService.checkAnswerRelation(nextQuestion, formGroup);

    if (checkedAnswersRelation) {
      this.enableQuestion(nextQuestion, formGroup);
      return nextQuestion;
    } else {
      this.disableQuestion(nextQuestion, formGroup);
      return this.getNextQuestionFrom(nextQuestion);
    }
  }

  private getPreviousQuestionFrom(question: Question): Question {
    const previousQuestion: Question =
      this.questionService.previousQuestion(question);
    const id: string = previousQuestion.id.toString();
    const disabled: boolean = this.formGroup.get(id)!.disabled;

    if (disabled) {
      return this.getPreviousQuestionFrom(previousQuestion);
    } else {
      return previousQuestion;
    }
  }

  private enableQuestion(question: Question, formGroup: FormGroup): void {
    this.answerRelationService.enableQuestion(question, formGroup);
  }

  private disableQuestion(question: Question, formGroup: FormGroup): void {
    this.answerRelationService.disableQuestion(question, formGroup);
  }

  isDraft(): boolean {
    return this.detailedFormService.isDraft();
  }

  isSurvey(): boolean {
    return this.detailedFormService.isSurvey();
  }
}
