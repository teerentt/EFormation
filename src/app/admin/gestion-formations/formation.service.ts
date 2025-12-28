import { Injectable, signal } from '@angular/core';
import { Formation } from '../../models/formations.model';
@Injectable({
        providedIn: 'root',
})
export class FormationService {
     private formationsList = signal<Formation[]>([
      {
        id: 1,
        titre: 'Développement Web',
        description: 'Apprendre les fondamentaux du développement web moderne.',
        heures: 60,
        programPdf: 'programme-dev-web.pdf',
        difficulte: 'débutant',
        tags: ['html', 'css', 'javascript'],
        categories: [1, 3],
        sessions: ['S1', 'S2'],
      },
      {
        id: 2,
        titre: 'Data Analytics',
        description: "Maîtriser les outils d'analyse de données et la data visualisation.",
        heures: 45,
        programPdf: 'programme-data.pdf',
        difficulte: 'intermédiaire',
        tags: ['python', 'pandas', 'visualisation'],
        categories: [2, 4],
        sessions: ['S3'],
      },
      {
        id: 3,
        titre: 'Cybersécurité',
        description: 'Comprendre les enjeux de la sécurité informatique et les bonnes pratiques.',
        heures: 50,
        programPdf: 'programme-cybersecurite.pdf',
        difficulte: 'avancé',
        tags: ['réseau', 'sécurité', 'audit'],
        categories: [3],
        sessions: ['S4'],
      },
    ]);

    getFormations(): Formation[] {
      return this.formationsList();
    }
     getFormationById(id: string): Formation | undefined {
      const formationId = Number(id);
      return this.formationsList().find((formation) => formation.id === formationId);
    }

    getCategories(): number[] {
      const categories = new Set<number>();
      this.formationsList().forEach((formation) => {
        formation.categories.forEach((category) => categories.add(category));
      });
      return Array.from(categories);
    }
}