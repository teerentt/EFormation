import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Formation } from '../../models/formations.model';
import { FormationService } from './formation.service';
import { AddFormation } from './add-formation/add-formation';
import { UpdateFormation } from './update-formation/update-formation';

@Component({
  selector: 'app-gestion-formations',
  standalone: true,
  imports: [CommonModule, FormsModule, AddFormation, UpdateFormation],
  templateUrl: './gestion-formations.html',
  styleUrls: ['./gestion-formations.css'],
})
export class GestionFormations {
  formations = signal<Formation[]>([]);
  showAdd = signal(false);
  showUpdate = signal(false);
  selectedFormation = signal<Formation | null>(null);

  constructor(private formationService: FormationService) {
    this.refresh();
  }

  refresh(): void {
    this.formations.set(this.formationService.getFormations());
  }

  onAdd(): void {
    this.showAdd.set(true);
  }

  onHideAdd(): void {
    this.showAdd.set(false);
    this.refresh();
  }

  onEdit(formation: Formation): void {
    this.selectedFormation.set(formation);
    this.showUpdate.set(true);
  }

  onHideUpdate(): void {
    this.showUpdate.set(false);
    this.selectedFormation.set(null);
    this.refresh();
  }

  onDelete(id: string): void {
    if (confirm('Supprimer cette formation ?')) {
      this.formationService.removeFormation(id);
      this.refresh();
    }
  }
}
