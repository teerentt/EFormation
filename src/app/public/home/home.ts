import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormationService } from '../../admin/gestion-formations/formation.service';

@Component({
  selector: 'app-public-home',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl:  './home.html',
  styleUrls: ['./home.css'],
})
export class PublicHome implements OnInit {
  categories: number[] = [];

  constructor(private formationService: FormationService) {}

  ngOnInit(): void {
    this.categories = this.formationService.getCategories();
  }
}