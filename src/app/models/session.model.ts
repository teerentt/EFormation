export interface Session {
  id: string;
  formationId: string;
  formateurIds: string[];
  candidatsInscrits: string[];
  dateDebut: Date;
  dateFin: Date;
  description: string;
  maxInscrits: number;
} 