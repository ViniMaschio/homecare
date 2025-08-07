import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverModal } from './caregiver-modal';

describe('CaregiverModal', () => {
  let component: CaregiverModal;
  let fixture: ComponentFixture<CaregiverModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaregiverModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaregiverModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
