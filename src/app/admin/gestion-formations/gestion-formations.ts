import { Component } from '@angular/core';
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
  formations: Formation[] = [];
  showAdd = false;
  showUpdate = false;
  selectedFormation: Formation | null = null;

  constructor(private formationService: FormationService) {
    this.refresh();
  }

  refresh(): void {
    this.formations = this.formationService.getFormations();
  }

  onAdd(): void {
    this.showAdd = true;
  }

  onHideAdd(): void {
    this.showAdd = false;
    this.refresh();
  }

  onEdit(formation: Formation): void {
    this.selectedFormation = formation;
    this.showUpdate = true;
  }

  onHideUpdate(): void {
    this.showUpdate = false;
    this.selectedFormation = null;
    this.refresh();
  }

  onDelete(id: string): void {
    if (confirm('Supprimer cette formation ?')) {
      this.formationService.removeFormation(id);
      this.refresh();
    }
  }
} 
