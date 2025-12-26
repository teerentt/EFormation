import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSessions } from './gestion-sessions';

describe('GestionSessions', () => {
  let component: GestionSessions;
  let fixture: ComponentFixture<GestionSessions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionSessions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionSessions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
