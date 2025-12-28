import { Component, OnInit, computed, signal } from '@angular/core';
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
  private formations = signal<Formation[]>([]);
  searchTerm = signal('');
  filteredFormations = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const list = this.formations();
    if (!term) {
      return list;
    }
    return list.filter(
      (formation) =>
        formation.titre.toLowerCase().includes(term) ||
        formation.tags.some((tag) => tag.toLowerCase().includes(term))
    );
  });

  constructor(private formationService: FormationService) {}

  ngOnInit(): void {
    this.formations.set(this.formationService.getFormations());
  }
}
