import { DeliverableConstant, ErrorCodes } from '../constants';
import deliverables from '../constants/Deliverables.json';
import { Exception } from '../helpers';
import { Deliverable, DeliverableList } from '../interfaces/Deliverable';

class DeliverableManager {
  static async getPaginatedList(): Promise<DeliverableList> {
    return deliverables;
  }

  static async getDeliverableById(id: number): Promise<Deliverable | undefined> {
    const deliverable =  deliverables.find(deliverable => deliverable.id === id);

    if (!deliverable) {
      throw new Exception(DeliverableConstant.MESSAGES.DELIVERABLE_NOT_FOUND, ErrorCodes.BAD_REQUEST)
    }

    return deliverable;
  }


}


export default DeliverableManager;