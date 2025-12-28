import { Injectable } from '@angular/core';
import { Formation } from '../../models/formations.model';

@Injectable({
  providedIn: 'root',
})
export class FormationService {
  private formationsList: Formation[] = [
    {
      id: 'F-101',
      titre: 'Angular Essentials',
      description: "Découvrir les bases d'Angular et créer des composants réutilisables.",
      heures: 30,
      programPdf: 'angular-essentials.pdf',
      difficulte: 'débutant',
      tags: ['angular', 'typescript', 'components'],
      categories: [1, 2],
    },
    {
      id: 'F-202',
      titre: 'Gestion des APIs avec Node.js',
      description: 'Construire des APIs REST sécurisées avec Node.js et Express.',
      heures: 24,
      programPdf: 'node-api.pdf',
      difficulte: 'intermédiaire',
      tags: ['nodejs', 'express', 'api'],
      categories: [2, 3],
    },
    {
      id: 'F-303',
      titre: 'Analyse de données avec Python',
      description: 'Manipuler, analyser et visualiser des données en Python.',
      heures: 40,
      programPdf: 'python-data.pdf',
      difficulte: 'avancé',
      tags: ['python', 'pandas', 'analytics'],
      categories: [4],
    },
  ];

  getFormations(): Formation[] {
    return [...this.formationsList];
  }

  getFormationById(id: string): Formation | undefined {
    return this.formationsList.find((formation) => formation.id === id);
  }

  addFormation(formation: Formation): void {
    this.formationsList = [...this.formationsList, formation];
  }

  updateFormation(updatedFormation: Formation): void {
    this.formationsList = this.formationsList.map((formation) =>
      formation.id === updatedFormation.id ? updatedFormation : formation
    );
  }

  removeFormation(id: string): void {
    this.formationsList = this.formationsList.filter((formation) => formation.id !== id);
  }

  getNextId(): string {
    return `F-${100 + this.formationsList.length + 1}`;
  }

  getCategories(): number[] {
    const categories = new Set<number>();
    this.formationsList.forEach((formation) =>
      formation.categories?.forEach((category) => categories.add(category))
    );
    return Array.from(categories);
  }
}
