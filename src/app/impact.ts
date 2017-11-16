
import { ImpactThresholdSet } from './entities/ImpactThresholdSets/impactthresholdset';
import { NwsOffice } from './entities/nwsOffice/nwsOffice';

export class Impact {
  id: number;

  status: string;

  name: string='';

  impactTime?: string;

  impactAttributes?: string;

  requiresOnSiteSupport?: boolean;

  briefingApproved?: boolean;

  onSiteSupportApproved?: boolean;

  // contact?: Contact;

  nwsOffice?: NwsOffice;

  lastModified: Date = new Date();

  actions?: string;

  website?: string;

  population?: number;

  timeToShelter?: number;

  beginAlerting?: number;

  stopAlerting?: number;

  notes?: string;

  requiresBriefing?: boolean;

  briefingTime?: Date;

  impactThresholdSets?: ImpactThresholdSet[];
}

export const statuses = ['APPROVED', 'DENIED', 'SA', 'PENDING'];
