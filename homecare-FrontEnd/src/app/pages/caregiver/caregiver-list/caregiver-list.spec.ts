import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverList } from './caregiver-list';

describe('CaregiverList', () => {
  let component: CaregiverList;
  let fixture: ComponentFixture<CaregiverList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaregiverList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaregiverList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
