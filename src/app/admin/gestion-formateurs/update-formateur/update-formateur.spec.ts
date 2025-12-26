import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFormateur } from './update-formateur';

describe('UpdateFormateur', () => {
  let component: UpdateFormateur;
  let fixture: ComponentFixture<UpdateFormateur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFormateur]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFormateur);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
