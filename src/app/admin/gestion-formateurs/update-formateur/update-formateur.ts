import { Component, input } from '@angular/core';
import { FormateursService } from '../formateurs.service';
import { Formateur } from '../../../models/formateur.model';
import { FormsModule } from '@angular/forms';
import { output } from '@angular/core';
@Component({
  selector: 'app-update-formateur',
  imports: [FormsModule],
  templateUrl: './update-formateur.html',
  styleUrl: './update-formateur.css',
})
export class UpdateFormateur {
  formateurInitial = input<Formateur>({
    id: 0,
    nom: '',
    prenom: '',
    email: '',
    cin: '',
    phone: 0,
    cv: '',
    specialite: [],
  });
  nom!: string;
  prenom!: string;
  email!: string;
  cin!: string;
  phone!: number;
  cv!: string;
  specialite!: string;

  constructor(private formateursService: FormateursService) {}
  ngOnInit() {
    this.nom = this.formateurInitial().nom;
    this.prenom = this.formateurInitial().prenom;
    this.email = this.formateurInitial().email;
    this.cin = this.formateurInitial().cin;
    this.phone = this.formateurInitial().phone;
    this.cv = this.formateurInitial().cv;
    this.specialite = this.formateurInitial().specialite!.join(',');
  }
  hideDialogEvenet = output<boolean>();
  onHideDialog() {
    this.hideDialogEvenet.emit(false);
  }

  onSubmit() {
    const newFormateur: Formateur = {
      id: this.formateursService.getLastId() + 1,
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      cin: this.cin,
      phone: this.phone,
      cv: this.cv,
      specialite: this.specialite.trim().split(','),
    };
    this.formateursService.updateFormateur(newFormateur);
    this.onHideDialog();
  }
}
