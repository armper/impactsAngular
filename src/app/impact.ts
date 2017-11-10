
import { ImpactThresholdSet } from './entities/ImpactThresholdSets/impactthresholdset';
import {Contact} from './entities/contact/contact';
import {NwsOffice} from './entities/nwsOffice/nwsOffice';

export class Impact {
  id: number;

  name: string;

  impactTime: string;

  impactAttributes: string;

  status: ImpactStatus;

  requiresOnSiteSupport: boolean;

  briefingApproved: boolean;

  onSiteSupportApproved: boolean;

  contact: Contact;

  nwsOffice: NwsOffice;

  lastModified: Date;

  actions: string;

  website: string;

  population: number;

  timeToShelter: number;

  beginAlerting: number;

  stopAlerting: number;

  notes: string;

  requiresBriefing: boolean;

  briefingTime: Date;

  impactThresholdSets: ImpactThresholdSet;

  //  /** The set containing the thresholds for this impact */
  //  @BatchSize(size = 20)
  //  @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH})
  //  @JoinTable(schema = "impact", name = "impact_to_impact_threshold", joinColumns = @JoinColumn(name = "impact_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "impact_threshold_id", referencedColumnName = "id"))
  //  private Set<ImpactThresholdSet> impactThresholdSets = new HashSet<ImpactThresholdSet>();
  //
  //  /** The set containing the locations for this impact */
  //  @BatchSize(size = 20)
  //  @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH})
  //  @JoinTable(schema = "impact", name = "impact_to_location", joinColumns = @JoinColumn(name = "impact_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "location_id", referencedColumnName = "id"))
  //  private Set<Location> locations = new HashSet<Location>();
  //
  //  /** The set containing the points of contact for this impact. */
  //  @BatchSize(size = 20)
  //  @OneToMany(fetch = FetchType.LAZY, cascade = {
  //    CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE,
  //    CascadeType.REFRESH
  //  }, mappedBy = "impact")
  //  private Set<ImpactPointsOfContact> pointsOfContact = new HashSet<ImpactPointsOfContact>();
  //

}

export enum ImpactStatus {
  PENDING, APPROVED, DENIED, SA
}
