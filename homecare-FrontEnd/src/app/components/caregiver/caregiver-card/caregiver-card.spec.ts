import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverCard } from './caregiver-card';

describe('CaregiverCard', () => {
  let component: CaregiverCard;
  let fixture: ComponentFixture<CaregiverCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaregiverCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaregiverCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
