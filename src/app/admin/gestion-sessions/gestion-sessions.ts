import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from './sessions.service';
import { InscriptionForm } from '../../public/inscription-form/inscription-form';
import { Session } from '../../models/session.model';

@Component({
  selector: 'app-gestion-sessions',
  standalone: true,
  imports: [CommonModule, InscriptionForm],
  templateUrl: './gestion-sessions.html',
  styleUrls: ['./gestion-sessions.css'],
})
export class GestionSessions {
  sessions = signal<Session[]>([]);
  showing = signal<Record<string, boolean>>({});

  constructor(private sessionService: SessionService) {
    this.load();
  }

  load(): void {
    this.sessions.set(this.sessionService.getAllSessions());
  }

  toggleCandidates(sessionId: string): void {
    const current = this.showing();
    this.showing.set({
      ...current,
      [sessionId]: !current[sessionId],
    });
  }

  registerFor(sessionId: string, email: string): void {
    const ok = this.sessionService.registerCandidate(sessionId, email);
    alert(ok ? 'Inscription réussie' : 'Impossible de s\'inscrire (déjà inscrit ou session complète)');
    this.load();
  }
}

