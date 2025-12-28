import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormationService } from '../../admin/gestion-formations/formation.service';

@Component({
  selector: 'app-public-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl:  './home.html',
  styleUrls: ['./home.css'],
})
export class PublicHome implements OnInit {
  categories = signal<number[]>([]);

  constructor(private formationService: FormationService) {}

  ngOnInit(): void {
    this.categories.set(this.formationService.getCategories());
  }
}
