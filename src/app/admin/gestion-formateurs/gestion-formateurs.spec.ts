import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionFormateurs } from './gestion-formateurs';

describe('GestionFormateurs', () => {
  let component: GestionFormateurs;
  let fixture: ComponentFixture<GestionFormateurs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionFormateurs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionFormateurs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
