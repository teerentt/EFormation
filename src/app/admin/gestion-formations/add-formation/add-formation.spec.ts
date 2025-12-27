import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormation } from './add-formation';

describe('AddFormation', () => {
  let component: AddFormation;
  let fixture: ComponentFixture<AddFormation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFormation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFormation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
