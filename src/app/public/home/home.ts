import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormationService } from '../../admin/gestion-formations/formation.service';

@Component({
  selector: 'app-public-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl:  './home.html',
  styleUrl: './home.css',
})
export class PublicHome implements OnInit {
  categories: number[] = [];

  constructor(private formationService: FormationService) {}

  ngOnInit(): void {
    this.categories = this.formationService.getCategories();
  }
}