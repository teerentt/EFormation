import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicFormationDetail } from './formation-detail';

describe('PublicFormationDetail', () => {
  let component: PublicFormationDetail;
  let fixture: ComponentFixture<PublicFormationDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicFormationDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicFormationDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
