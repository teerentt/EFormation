import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionFormations } from './gestion-formations';

describe('GestionFormations', () => {
  let component: GestionFormations;
  let fixture: ComponentFixture<GestionFormations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionFormations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionFormations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
