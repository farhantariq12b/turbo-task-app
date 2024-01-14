interface DeliverableCreatedBy {
  email: string;
  icon: string;
}

interface DeliverableVariable {
  placeholder: string;
  Name: string;
  type: string;
  required: boolean;
}

export interface Deliverable {
  type: string;
  Name: string;
  DateCreated: string;
  createdBy: DeliverableCreatedBy;
  variables: DeliverableVariable[];
}

export type DeliverableList = Deliverable[];
