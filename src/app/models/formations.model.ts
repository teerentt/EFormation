export interface Formation {
  id: number;
  titre: string;
  description: string;
  heures: number;
  programPdf?: string;
  difficulte: 'débutant' | 'intermédiaire' | 'avancé';
  tags: string[];
  categories: number[];
  sessions: string[];
} 