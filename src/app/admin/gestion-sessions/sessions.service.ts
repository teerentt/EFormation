import { Injectable, signal } from '@angular/core';
import { Session } from '../../models/session.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private sessionsList = signal<Session[]>([
    {
      id: 'S1',
      formationId: 'F-101',
      formateurIds: ['F1'],
      candidatsInscrits: ['candidat1@example.com'],
      dateDebut: new Date('2024-11-10'),
      dateFin: new Date('2024-11-15'),
      description: 'Session intensive pour découvrir le développement web.',
      maxInscrits: 15,
    },
    {
      id: 'S2',
      formationId: 'F-101',
      formateurIds: ['F2'],
      candidatsInscrits: [],
      dateDebut: new Date('2025-01-05'),
      dateFin: new Date('2025-01-10'),
      description: 'Session du soir adaptée aux débutants.',
      maxInscrits: 15,
    },
    {
      id: 'S3',
      formationId: 'F-202',
      formateurIds: ['F3'],
      candidatsInscrits: ['analyste@example.com'],
      dateDebut: new Date('2024-12-01'),
      dateFin: new Date('2024-12-05'),
      description: "Atelier dédié à l'analyse de données.",
      maxInscrits: 12,
    },
    {
      id: 'S4',
      formationId: 'F-303',
      formateurIds: ['F4', 'F5'],
      candidatsInscrits: [],
      dateDebut: new Date('2025-02-10'),
      dateFin: new Date('2025-02-14'),
      description: 'Bootcamp sécurité et bonnes pratiques.',
      maxInscrits: 10,
    },
  ]);

  getSessionsByFormation(formationId: string): Session[] {
    return this.sessionsList().filter((session) => session.formationId === formationId);
  }

  getAllSessions(): Session[] {
    return this.sessionsList();
  }

  registerCandidate(sessionId: string, email: string): boolean {
    const sessions = this.sessionsList();
    const sessionIndex = sessions.findIndex((session) => session.id === sessionId);
    if (sessionIndex === -1) {
      return false;
    }

    const session = sessions[sessionIndex];
    if (
      session.candidatsInscrits.length >= session.maxInscrits ||
      session.candidatsInscrits.includes(email)
    ) {
      return false;
    }

    const updatedSessions = [...sessions];
    updatedSessions[sessionIndex] = {
      ...session,
      candidatsInscrits: [...session.candidatsInscrits, email],
    };
    this.sessionsList.set(updatedSessions);
    return true;
  }
}