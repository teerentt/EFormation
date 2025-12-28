import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Formation } from '../../../models/formations.model';
import { FormationService } from '../formation.service';

@Component({
  selector: 'app-add-formation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-formation.html',
  styleUrls: ['./add-formation.css'],
})
export class AddFormation {
  @Output() hideDialogEvent = new EventEmitter<boolean>();
  titre = '';
  description = '';
  heures: number | null = null;
  difficulte: Formation['difficulte'] = 'débutant';
  tags = '';
  categories = '';
  programPdf = '';

  constructor(private formationService: FormationService) {}

  onHideDialog(): void {
    this.hideDialogEvent.emit(false);
  }

  onSubmit(): void {
    if (!this.titre.trim() || !this.description.trim() || this.heures === null) {
      return;
    }
    const newFormation: Formation = {
      id: this.formationService.getNextId(),
      titre: this.titre,
      description: this.description,
      heures: this.heures,
      programPdf: this.programPdf || undefined,
      difficulte: this.difficulte,
      tags: this.tags
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      categories: this.categories
        .split(',')
        .map((item) => Number(item.trim()))
        .filter((value) => !Number.isNaN(value)),
    };
    this.formationService.addFormation(newFormation);
    this.onHideDialog();
  }
}
