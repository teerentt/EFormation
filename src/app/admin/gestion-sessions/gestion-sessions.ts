import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionService } from './sessions.service';
import { FormationService } from '../gestion-formations/formation.service';
import { InscriptionForm } from '../../public/inscription-form/inscription-form';
import { Session } from '../../models/session.model';
import { Formation } from '../../models/formations.model';

@Component({
  selector: 'app-gestion-sessions',
  standalone: true,
  imports: [CommonModule, FormsModule, InscriptionForm],
  templateUrl: './gestion-sessions.html',
  styleUrls: ['./gestion-sessions.css'],
})
export class GestionSessions {
  sessions = signal<Session[]>([]);
  formations = signal<Formation[]>([]);
  showing = signal<Record<string, boolean>>({});
  showAddForm = signal(false);

  selectedFormationId = signal('');
  dateDebut = signal('');
  dateFin = signal('');
  description = signal('');
  maxInscrits = signal(10);

  constructor(
    private sessionService: SessionService,
    private formationService: FormationService
  ) {
    this.load();
  }

  load(): void {
    this.sessions.set(this.sessionService.getAllSessions());
    this.formations.set(this.formationService.getFormations());
  }

  getFormationTitle(formationId: string): string {
    return this.formations().find((f) => f.id === formationId)?.titre ?? formationId;
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
    alert(ok ? 'Inscription reussie' : 'Impossible de s\'inscrire (deja inscrit ou session complete)');
    this.load();
  }

  onShowAddSession(): void {
    this.showAddForm.set(true);
  }

  onCancelAddSession(): void {
    this.showAddForm.set(false);
    this.selectedFormationId.set('');
    this.dateDebut.set('');
    this.dateFin.set('');
    this.description.set('');
    this.maxInscrits.set(10);
  }

  onCreateSession(): void {
    const formationId = this.selectedFormationId().trim();
    const start = this.dateDebut().trim();
    const end = this.dateFin().trim();
    const desc = this.description().trim();
    const max = Number(this.maxInscrits());

    if (!formationId || !start || !end || !desc || !max) {
      return;
    }

    const dateDebut = new Date(start);
    const dateFin = new Date(end);
    if (Number.isNaN(dateDebut.getTime()) || Number.isNaN(dateFin.getTime())) {
      return;
    }

    const newSession: Session = {
      id: this.sessionService.getNextId(),
      formationId,
      formateurIds: [],
      candidatsInscrits: [],
      dateDebut,
      dateFin,
      description: desc,
      maxInscrits: max,
    };
    this.sessionService.addSession(newSession);
    this.onCancelAddSession();
    this.load();
  }

  onMaxInscritsChange(value: string): void {
    const parsed = Number(value);
    this.maxInscrits.set(Number.isNaN(parsed) ? 0 : parsed);
  }
}
