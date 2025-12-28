import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormateursService } from '../formateurs.service';
import { Formateur } from '../../../models/formateur.model';
@Component({
  selector: 'app-add-formateur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-formateur.html',
  styleUrls: ['./add-formateur.css'],
})
export class AddFormateur {
  @Output() hideDialogEvent = new EventEmitter<boolean>();

  nom = '';
  prenom = '';
  email = '';
  cin = '';
  phone: number | null = null;
  cv = '';
  specialite = '';

  constructor(private formateursService: FormateursService) { }
  onHideDialog(): void {
    this.hideDialogEvent.emit(false);
  }

  onSubmit(): void {
    if (
      this.nom.trim() &&
      this.prenom.trim() &&
      this.email.trim() &&
      this.cin.trim() &&
      this.phone !== null &&
      this.cv.trim()
    ) {
      const newFormateur: Formateur = {
        id: this.formateursService.getLastId() + 1,
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        cin: this.cin,
        phone: this.phone,
        cv: this.cv,
        specialite: this.specialite
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
      };
      this.formateursService.addFormateur(newFormateur);
      this.onHideDialog();
    }
  }
}