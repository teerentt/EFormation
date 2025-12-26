import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormateur } from './add-formateur';

describe('AddFormateur', () => {
  let component: AddFormateur;
  let fixture: ComponentFixture<AddFormateur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFormateur]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFormateur);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
