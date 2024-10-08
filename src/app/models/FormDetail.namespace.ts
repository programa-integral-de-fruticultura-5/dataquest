import { Beneficiary } from "./Beneficiary.namespace";

export namespace FormDetail {

  export enum FormType {
    SPECIALIZED = 1,
    SUPPORT = 5,
    SUPPLY = 7,
    PARCEL = 11,
    PARCEL_SUPPLIES = 12,
    GREENHOUSE = 13,
    GREENHOUSE_SUPPLIES = 14,
    PARCEL_SUPPORT = 15,
    GREENHOUSE_SUPPORT = 16,
  }

  export interface Form {
    id: number,
    uuid: string,
    name: string,
    fechaDescarga: string,
    fechaInicial: string,
    fechaUltimoCambio: string,
    fechaCarga: string,
    sync: boolean,
    position: string,
    altitud: number,
    dateInit: string,
    dateEnd: string,
    questions: Array<Question>,
    description: string,
    beneficiary: Beneficiary.Producer,
  }

  export type FormResponse = {
    id: number,
    name: string,
    description: string,
    dateInit: string,
    dateEnd: string,
    projectID: number,
    questions: Array<QuestionResponse>,
    pivot: Pivot,
  }

  export type Pivot = {
    user_id: number,
    form_id: number,
  }

  export interface Question {
    id: string,
    text: string,
    type: string,
    required: number,
    dataType: string,
    order: number,
    answerLength: number,
    extendable: boolean,
    questionParentId: string,
    answers: Array<Answer>,
    questionCategoryId: number,
    questionCategory: QuestionCategory,
    answersRelation: Array<AnswerRelation>,
    questionChildren: Array<Array<Question>>,
    userTypeRestriction: string,
    min?: number,
    max?: number
  }

  export type QuestionResponse = {
    id: number,
    type: string,
    required: number,
    dataType: string,
    text: string,
    order: number,
    extends: number,
    min: number,
    max: number,
    user_type_restriction: string,
    questionParentId: number,
    formID: number,
    question_category_id: number,
    answers: Array<AnswerResponse>,
    answers_relation: Array<AnswerRelationResponse>,
    question_category: QuestionCategoryResponse,
  }

  export interface QuestionCategory {
    id: number,
    name: string,
  }

  export type QuestionCategoryResponse = QuestionCategory

  export interface Answer {
    id: number,
    order: number,
    questionId: string,
    checked: boolean,
    value: string,
  }

  export type AnswerResponse = {
    id: number,
    order: number,
    question_id: number,
    value: string,
  }

  export interface AnswerRelation {
    id: number,
    questionId: string,
    answerPivot: AnswerPivot,
  }

  export type AnswerRelationResponse = {
    id: number,
    question_id: number,
    pivot: AnswerPivotResponse,
  }

  export interface AnswerPivot {
    questionId: string,
    answerId: number,
    type: string,
  }

  export type AnswerPivotResponse = {
    question_id: number,
    answer_id: number,
    type: string,
  }
}
