import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Impact, statuses } from '../../impact';
import { ImpactService } from '../../impact.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { ImpactThresholdSet } from '../../entities/ImpactThresholdSets/impactthresholdset';
import { ImpactThresholdSet } from './../../entities/ImpactThresholdSets/impactthresholdset';

@Component({
  selector: 'app-impact-editor',
  templateUrl: './impacts.editor.component.html',
  styleUrls: ['./impacts.editor.component.css']
})
export class ImpactEditorComponent implements OnInit {
  constructor(private impactService: ImpactService, private fb: FormBuilder) {
    this.createForm();
  }

  impactForm: FormGroup;

  statuses = statuses;

  @Input()
  impact: Impact;

  id: number = 6994;

  ngOnInit(): void {

    if (this.id == null) {
      this.impact = new Impact();
      console.log("creating a new contact!")
    }
    else
      this.getImpact(this.id);

  }

  createForm() {
    this.impactForm = this.fb.group({
      id: '',
      name: ['', Validators.required],
      status: ['', Validators.required],
      notes:'',
      impactThresholdSets: this.fb.array([]),
      severity:''
    });
  }
  getImpact(id) {
    this.impactService.getImpact(id)
      .subscribe(impact => {
        this.impact = impact;
        this.ngOnChanges()
        if (impact.impactThresholdSets != null)
          console.log("impactThresholdSets name " + impact.impactThresholdSets[0].name)
      });
  }
  ngOnChanges() {
    this.impactForm.reset(
      {
        name: this.impact.name,
        status: this.impact.status,
        notes: this.impact.notes        
      });

      this.setImpactThresholdSets(this.impact.impactThresholdSets);
  }

  setImpactThresholdSets(impactThresholdSets: ImpactThresholdSet[]) {
    const impactThresholdSetFormGroups = impactThresholdSets.map(impactThresholdSet => this.fb.group(impactThresholdSet));
    const impactThresholdSetFormArray = this.fb.array(impactThresholdSetFormGroups);
    this.impactForm.setControl('impactThresholdSets', impactThresholdSetFormArray);
  }

  get impactThresholdSets(): FormArray {
    return this.impactForm.get('impactThresholdSets') as FormArray;
  };

  addImpactThresholdSet() {
    this.impactThresholdSets.push(this.fb.group(new ImpactThresholdSet()));
  }

  onSubmit() {
    this.impact = this.prepareSaveImpact();
    this.impactService.updateImpact(this.impact).subscribe(/* error handling */);
    this.ngOnChanges();
  }

  prepareSaveImpact(): Impact {
    const formModel = this.impactForm.value;

    // deep copy of form model lairs
    const impactThresholdSetsDeepCopy: ImpactThresholdSet[] = formModel.impactThresholdSets.map(
      (impactThresholdSet: ImpactThresholdSet) => Object.assign({}, impactThresholdSet)
    );

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveImpact: Impact = {
      id: this.impact.id,
      name: formModel.name as string,
      status: formModel.status as string,
      lastModified: new Date(),

      // addresses: formModel.secretLairs // <-- bad!
      impactThresholdSets: impactThresholdSetsDeepCopy
    };
    return saveImpact;
  }

  revert() { 
    this.ngOnChanges(); 
  }
  
}    