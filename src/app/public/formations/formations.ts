import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Formation } from '../../models/formations.model';
import { FormationService } from '../../admin/gestion-formations/formation.service';

@Component({
  selector: 'app-public-formations',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './formations.html',
  styleUrls: ['./formations.css'],
})
export class PublicFormations implements OnInit {
  formations: Formation[] = [];
  searchTerm = '';

  constructor(private formationService: FormationService) {}

  ngOnInit(): void {
    this.formations = this.formationService.getFormations();
  }

  get filteredFormations(): Formation[] {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      return this.formations;
    }
    return this.formations.filter(
      (formation) =>
        formation.titre.toLowerCase().includes(term) ||
        formation.tags.some((tag) => tag.toLowerCase().includes(term))
    );
  }
}