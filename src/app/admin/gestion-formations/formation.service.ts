import {Injectable,signal} from '@angular/core';
import { Formation } from '../../models/formations.model';
@Injectable({
    providedIn:'root',
})
export class FormationService {
    private formationsList=signal<Formation[]>([]);
    


    }