import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicFormations } from './formations';

describe('PublicFormations', () => {
  let component: PublicFormations;
  let fixture: ComponentFixture<PublicFormations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicFormations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicFormations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
