import { Component } from '@angular/core';
import { FormateursService } from '../formateurs.service';
import { Formateur } from '../../../models/formateur.model';
import { FormsModule } from '@angular/forms';
import { output } from '@angular/core';
@Component({
  selector: 'app-add-formateur',
  imports: [FormsModule],
  templateUrl: './add-formateur.html',
  styleUrl: './add-formateur.css',
})
export class AddFormateur {
  hideDialogEvenet = output<boolean>();
  onHideDialog() {
  this.hideDialogEvenet.emit(false);
  }
  formateurInitial = {
    id: 0,
    nom: '',
    prenom: '',
    email: '',
    cin: '',
    phone: 0,
    cv: '',
    specialite: [],
  };
  nom!: string;
  prenom!: string
  email!: string;
  cin!: string;
  phone!: number;
  cv!: string;
  specialite!: string;

  constructor(private formateursService: FormateursService) {}
  onSubmit(){
    if(this.nom!==undefined && this.prenom!==undefined && this.email!==undefined && this.cin!==undefined && this.phone!==undefined && this.cv!==undefined){
    const newFormateur: Formateur = {
      id:this.formateursService.getLastId()+1,
      nom:this.nom,
      prenom:this.prenom,
      email:this.email,
      cin:this.cin,
      phone:this.phone,
      cv:this.cv,
      specialite:this.specialite.trim().split(',')
  };
    this.formateursService.addFormateur(newFormateur);
    this.onHideDialog();
}
}
}
