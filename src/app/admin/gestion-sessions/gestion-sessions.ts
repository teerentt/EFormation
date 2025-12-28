import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from './sessions.service';
import { FormationService } from '../gestion-formations/formation.service';
import { InscriptionForm } from '../../public/inscription-form/inscription-form';

@Component({
  selector: 'app-gestion-sessions',
  standalone: true,
  imports: [CommonModule, InscriptionForm],
  templateUrl: './gestion-sessions.html',
  styleUrls: ['./gestion-sessions.css'],
})
export class GestionSessions {
  sessions: any[] = [];
  showing: Record<string, boolean> = {};

  constructor(private sessionService: SessionService, private formationService: FormationService) {
    this.load();
  }

  load(): void {
    this.sessions = this.sessionService.getAllSessions();
  }

  toggleCandidates(sessionId: string): void {
    this.showing[sessionId] = !this.showing[sessionId];
  }

  registerFor(sessionId: string, email: string): void {
    const ok = this.sessionService.registerCandidate(sessionId, email);
    alert(ok ? 'Inscription réussie' : 'Impossible de s\'inscrire (déjà inscrit ou session complète)');
    this.load();
  }
}

