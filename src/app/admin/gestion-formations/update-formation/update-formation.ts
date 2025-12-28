import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Formation } from '../../../models/formations.model';
import { FormationService } from '../formation.service';

@Component({
  selector: 'app-update-formation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-formation.html',
  styleUrls: ['./update-formation.css'],
})
export class UpdateFormation {
  @Input() formation!: Formation | null;
  @Output() hideDialogEvent = new EventEmitter<boolean>();

  titre = '';
  description = '';
  heures: number | null = null;
  difficulte: Formation['difficulte'] = 'débutant';
  tags = '';
  categories = '';

  constructor(private formationService: FormationService) {}

  ngOnChanges(): void {
    if (this.formation) {
      this.titre = this.formation.titre;
      this.description = this.formation.description;
      this.heures = this.formation.heures;
      this.difficulte = this.formation.difficulte;
      this.tags = this.formation.tags?.join(',') ?? '';
      this.categories = this.formation.categories?.join(',') ?? '';
    }
  }

  onHideDialog(): void {
    this.hideDialogEvent.emit(false);
  }

  onSubmit(): void {
    if (!this.formation) return;
    const updated: Formation = {
      ...this.formation,
      titre: this.titre,
      description: this.description,
      heures: this.heures ?? this.formation.heures,
      difficulte: this.difficulte,
      tags: this.tags.split(',').map((t) => t.trim()).filter(Boolean),
      categories: this.categories.split(',').map((c) => Number(c.trim())).filter((n) => !Number.isNaN(n)),
    };
    this.formationService.updateFormation(updated);
    this.onHideDialog();
  }
}
