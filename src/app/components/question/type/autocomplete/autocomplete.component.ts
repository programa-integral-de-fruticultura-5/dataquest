import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  booleanAttribute,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { AlertController, IonModal, IonicModule } from '@ionic/angular';
import { TypeaheadComponent } from '@components/typeahead/typeahead.component';
import { FormDetail } from '@models/FormDetail.namespace';
import { Beneficiary } from '@models/Beneficiary.namespace';
import { AssociationService } from '@services/association/association.service';
import { DetailedFormService } from '@services/detailed-form/detailed-form.service';
import { ProducerService } from '@services/producer/producer.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TypeaheadComponent],
})
export class AutocompleteComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal!: IonModal;
  @Input({ required: true }) question!: FormDetail.Question;
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ transform: booleanAttribute }) open!: boolean;
  @Input() title = 'Selecciona uno';
  @Input({ required: true }) disabled!: boolean;

  selection!: string;
  formId!: number;

  public data: string[] = [];

  constructor(
    private producersService: ProducerService,
    private associationService: AssociationService,
    private detailedFormService: DetailedFormService
  ) {}

  ngOnInit() {
    this.selection = this.getQuestionValue();
    this.formId = this.detailedFormService.getForm().id;
  }

  openModal(): void {
    this.data = this.getData();
    this.modal.present();
  }

  private getQuestionValue(): string {
    const answers: FormGroup = this.formGroup.get(
      `${this.question.id}`
    ) as FormGroup;
    let value: string = '';
    if (this.open) {
      const formControl: FormControl = this.formGroup.get(
        `${this.question.id}`
      ) as FormControl;
      value = formControl.value;
    } else {
      value = this.getSelectedValue(answers);
    }
    return value;
  }

  private getSelectedValue(answersFormGroup: FormGroup): string {
    let selectedValue: string = '';
    for (const key in answersFormGroup.controls) {
      if (answersFormGroup.controls[key].value) {
        selectedValue = this.question.answers.find(
          (answer) => answer.id.toString() === key
        )?.value as string;
      }
    }
    return selectedValue;
  }

  private getData(): string[] {
    let result: string[] = [];
    if (this.open) {
      result =  this.formId != 9 ? this.producersService.getProducersIds() : this.associationService.getAssociationsIds();
    } else {
      result = this.question.answers.map((answer) => answer.value);
    }
    return result;
  }

  selectionChanged(selection: string) {

    if (this.open) {
      const formControl: FormControl = this.formGroup.get(
        `${this.question.id}`
      ) as FormControl;
      if (this.formId != 9 && !this.assignBeneficiary(selection))
        return;
      formControl.setValue(selection);
    } else {
      const formGroup: FormGroup = this.formGroup.get(
        `${this.question.id}`
      ) as FormGroup;
      const answerId: string = this.getAnswerId(selection);
      this.setCheckedValue(formGroup, answerId);
    }
    this.selection = selection;
    this.modal.dismiss();
  }

  private setCheckedValue(answersFormGroup: FormGroup, id: string): void {
    for (const key in answersFormGroup.controls) {
      if (key === id) {
        answersFormGroup.controls[key].setValue(true);
      } else {
        answersFormGroup.controls[key].setValue(false);
      }
    }
  }

  private assignBeneficiary(id: string): boolean {
    const cedula = id.split(' ')[0];
    console.log('Cedula: ', cedula)
    const producers: Beneficiary.Producer[] = this.producersService.getProducers();
    const beneficiary: Beneficiary.Producer | undefined = producers.find(
      (producer) => producer.cedula == cedula
    );
    if (!beneficiary) {
      return false;
    }
    return this.detailedFormService.setBeneficiary(beneficiary);
  }

  private getAnswerId(value: string): string {
    const answer: FormDetail.Answer | undefined = this.question.answers.find((answer) => answer.value === value);
    return answer ? answer.id.toString() : '';
  }
}
