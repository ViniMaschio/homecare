import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverForm } from './caregiver-form';

describe('CaregiverForm', () => {
  let component: CaregiverForm;
  let fixture: ComponentFixture<CaregiverForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaregiverForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaregiverForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
