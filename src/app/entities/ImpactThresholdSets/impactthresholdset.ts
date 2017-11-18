import { ImpactElement } from '../element/impactElement';
import { NwsOffice } from './../nwsOffice/nwsOffice';

export class ImpactThresholdSet {
  id: number;
  name: string='';
  severity?: string='';
  impactElements?: ImpactElement[];
  nwsOffice: string;
}