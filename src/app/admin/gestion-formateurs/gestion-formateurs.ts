import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateFormateur } from "./update-formateur/update-formateur";
import { AddFormateur } from "./add-formateur/add-formateur";
import { FormateursService } from './formateurs.service';
import { Formateur } from '../../models/formateur.model';

@Component({
  selector: 'app-gestion-formateurs',
  standalone: true,
  imports: [CommonModule, UpdateFormateur, AddFormateur],
  templateUrl: './gestion-formateurs.html',
  styleUrls: ['./gestion-formateurs.css'],
})
export class GestionFormateurs {
  formateur = signal<Formateur[]>([]);
  toggleUpdateDialog = signal<boolean>(false);
  toggleAddDialog = signal<boolean>(false);
  formateurSelected = signal<Formateur>({
    id: 0,
    nom: '',
    prenom: '',
    email: '',
    phone: 0,
    cin: '',
    cv: '',
    specialite: [],
  });

  constructor(private formateurService: FormateursService) {
    this.formateur.set(this.formateurService.getFormateurs());
  }

  removeInstructor(formateurId: number) {
    this.formateurService.removeFormateur(formateurId);
    this.formateur.set(this.formateurService.getFormateurs());
  }

  onShowUpdateDialog(formateur: Formateur) {
    this.toggleUpdateDialog.set(true);
    this.formateurSelected.set(formateur);
  }

  onShowAddDialog() {
    this.toggleAddDialog.set(true);
  }

  onHideUpdateDialog(status: boolean) {
    this.toggleUpdateDialog.set(status);
    this.formateur.set(this.formateurService.getFormateurs());
  }

  onHideAddDialog(status: boolean) {
    this.toggleAddDialog.set(status);
    this.formateur.set(this.formateurService.getFormateurs());
  }
}