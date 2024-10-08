import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsPage } from './forms.page';

describe('Tab1Page', () => {
  let component: FormsPage;
  let fixture: ComponentFixture<FormsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(FormsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
