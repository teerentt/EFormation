export interface Formation {
  id: string;
  titre: string;
  description: string;
  heures: number;
  programPdf?: string;
  difficulté: 'débutant' | 'intermédiaire' | 'avancé';
  tags: string[];
  categories: number[];
} 