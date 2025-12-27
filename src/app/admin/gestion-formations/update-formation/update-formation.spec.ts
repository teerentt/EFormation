import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFormation } from './update-formation';

describe('UpdateFormation', () => {
  let component: UpdateFormation;
  let fixture: ComponentFixture<UpdateFormation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFormation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFormation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
