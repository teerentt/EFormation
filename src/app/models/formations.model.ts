export interface Formation {
  id: number;
  titre: string;
  description: string;
  heures: number;
  programPdf?: string;
  difficulté: 'débutant' | 'intermédiaire' | 'avancé';
  tags: string[];
  categories: number[];
  sessions: string[];
} 