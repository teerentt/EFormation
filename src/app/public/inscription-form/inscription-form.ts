import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Session } from '../../models/session.model';

@Component({
  selector: 'app-inscription-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './inscription-form.html',
  styleUrls: ['./inscription-form.css'],
})
export class InscriptionForm {
  @Input() session!: Session;
  @Output() register = new EventEmitter<string>();

  email = '';
  nom = '';
  prenom = '';

  onSubmit(): void {
    if (this.email.trim()) {
      this.register.emit(this.email.trim());
      this.email = '';
      this.nom = '';
      this.prenom = '';
    }
  }
}