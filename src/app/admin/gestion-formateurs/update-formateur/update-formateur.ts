import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormateursService } from '../formateurs.service';
import { Formateur } from '../../../models/formateur.model';

@Component({
  selector: 'app-update-formateur',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-formateur.html',
  styleUrls: ['./update-formateur.css'],
})
export class UpdateFormateur implements OnInit {
  @Input() formateurInitial!: Formateur;
  @Output() hideDialogEvent = new EventEmitter<boolean>();

  nom = '';
  prenom = '';
  email = '';
  cin = '';
  phone: number | null = null;
  cv = '';
  specialite = '';

  constructor(private formateursService: FormateursService) {}
  ngOnInit(): void {
    this.nom = this.formateurInitial.nom;
    this.prenom = this.formateurInitial.prenom;
    this.email = this.formateurInitial.email;
    this.cin = this.formateurInitial.cin;
    this.phone = this.formateurInitial.phone;
    this.cv = this.formateurInitial.cv;
    this.specialite = (this.formateurInitial.specialite || []).join(',');
  }
  
  onHideDialog(): void {
    this.hideDialogEvent.emit(false);
  }
   onSubmit(): void {
    if (!this.formateurInitial) {
      return;
    }
    const updatedFormateur: Formateur = {
      id: this.formateurInitial.id,
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      cin: this.cin,
       phone: this.phone ?? 0,
      cv: this.cv,
       specialite: this.specialite
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    };
     this.formateursService.updateFormateur(updatedFormateur);
    this.onHideDialog();
  }
}