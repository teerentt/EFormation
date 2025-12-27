import { Component, output, signal } from '@angular/core';
import { Formation } from '../../../models/formations.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-formation',
  imports: [FormsModule],
  templateUrl: './add-formation.html',
  styleUrl: './add-formation.css',
})
export class AddFormation {
  formationData= signal<Formation>({
    id:0,
    titre: '',
    description: '',
    heures: 0,
    difficulté: 'débutant',
    tags: [],
    categories: [],
    sessions: [],
  });
  constructor(private formationService: FormationService) {

  }

  hidDialogEvent=output<boolean>();
  onHideDialog(){
    this.hidDialogEvent.emit(true);
  }

  onSubmit(){
    if(this.formationService.titre !== undefined && this.formationData().description !== undefined
    && this.formationService.heures !== undefined
    && this.formationService.difficulté !== undefined
    && this.formationData().tags !== undefined
    && this.formationData().categories !== undefined
    && this.formationData().sessions !== undefined){
      let newFormation:Formation={
        id:this.formationService.id,
        titre:this.formationService.titre,
        description:this.formationService.description,
        heures:this.formationService.heures,
        difficulté:this.formationService.difficulté,
        tags:this.formationData().tags,
        categories:this.formationData().categories,
        sessions:this.formationData().sessions,
      };
}
  }}