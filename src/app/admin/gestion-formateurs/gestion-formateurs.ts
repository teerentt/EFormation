import { Component, OnInit, signal, computed } from '@angular/core';
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
  private _formateurs = signal<Formateur[]>([]);
  formateurs = this._formateurs.asReadonly();

  searchTerm = signal('');

  showUpdateDialog = signal(false);
  showAddDialog = signal(false);
  formateurSelected = signal<Formateur | undefined>(undefined);

  filteredFormateurs = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.formateurs();
    return this.formateurs().filter((f) =>
      `${f.nom} ${f.prenom} ${f.email} ${f.cin}`.toLowerCase().includes(term)
    );
  });

  constructor(private formateurService: FormateursService) {}

  ngOnInit(): void {
    this._formateurs.set(this.formateurService.getFormateurs());
  }

  onSearch(value: string): void {
    this.searchTerm.set(value);
  }

  removeInstructor(formateurId: number): void {
    this.formateurService.removeFormateur(formateurId);
    this._formateurs.set(this.formateurService.getFormateurs());
  }

  onShowUpdateDialog(formateur: Formateur): void {
    this.showUpdateDialog.set(true);
    this.formateurSelected.set(formateur);
  }

  onShowAddDialog(): void {
    this.showAddDialog.set(true);
  }

  onHideUpdateDialog(status: boolean): void {
    this.showUpdateDialog.set(status);
    this._formateurs.set(this.formateurService.getFormateurs());
  }

  onHideAddDialog(status: boolean): void {
    this.showAddDialog.set(status);
    this._formateurs.set(this.formateurService.getFormateurs());
  }
}