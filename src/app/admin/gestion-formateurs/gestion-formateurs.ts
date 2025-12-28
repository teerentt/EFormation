import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateFormateur } from './update-formateur/update-formateur';
import { AddFormateur } from './add-formateur/add-formateur';
import { FormateursService } from './formateurs.service';
import { Formateur } from '../../models/formateur.model';
@Component({
  selector: 'app-gestion-formateurs',
  standalone: true,
  imports: [CommonModule, UpdateFormateur, AddFormateur],
  templateUrl: './gestion-formateurs.html',
  styleUrls: ['./gestion-formateurs.css'],
})
export class GestionFormateurs implements OnInit {
  formateurs: Formateur[] = [];
  showUpdateDialog = false;
  showAddDialog = false;
  formateurSelected?: Formateur;

  constructor(private formateurService: FormateursService) {}

  ngOnInit(): void {
    this.formateurs = this.formateurService.getFormateurs();
  }
  removeInstructor(formateurId: number): void {
    this.formateurService.removeFormateur(formateurId);
    this.formateurs = this.formateurService.getFormateurs();
  }
onShowUpdateDialog(formateur: Formateur): void {
    this.showUpdateDialog = true;
    this.formateurSelected = formateur;
  }
   onShowAddDialog(): void {
    this.showAddDialog = true;
  }
 onHideUpdateDialog(status: boolean): void {
    this.showUpdateDialog = status;
    this.formateurs = this.formateurService.getFormateurs();
  }
  onHideAddDialog(status: boolean): void {
    this.showAddDialog = status;
    this.formateurs = this.formateurService.getFormateurs();
  }
}