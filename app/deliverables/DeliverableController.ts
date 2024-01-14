import { Request, Response } from "express";
import { Validators } from "../helpers";
import {
  DeliverableConstant,
  ErrorCodes,
} from "../constants";
import { Exception } from "../interfaces/Exception";
import DeliverableManager from "./DeliverableManager";

class Deliverable {
  static async getPaginatedList(req: Request, res: Response) {
    try {
      // TODO: Add pagination if data is being fetched from database

      const response = await DeliverableManager.getPaginatedList();

      res.json({
        success: true,
        data: response,
      });
    } catch (err) {
      const error = err as Exception;

      console.log(
        `getPaginatedList:: Request to getPaginatedList failed. data:: `,
        req.body,
        err
      );

      return res
        .status(
          Validators.validateCode(
            error.code,
            ErrorCodes.INTERNAL_SERVER_ERROR
          ) || ErrorCodes.INTERNAL_SERVER_ERROR
        )
        .json({
          success: false,
          message: error.reportError
            ? error.message
            : DeliverableConstant.MESSAGES.FETCHING_DELIVERABLES_FAILED,
        });
    }
  }

  static async getDeliverableById(req: Request, res: Response) {
    try {
      const { id: deliverableId } = req.params

      const response = await DeliverableManager.getDeliverableById(Number(deliverableId));

      res.json({
        success: true,
        data: response,
      });
    } catch (err) {
      const error = err as Exception;

      console.log(
        `getDeliverableById:: Request to getDeliverableById failed. data:: `,
        req.body,
        err
      );

      return res
        .status(
          Validators.validateCode(
            error.code,
            ErrorCodes.INTERNAL_SERVER_ERROR
          ) || ErrorCodes.INTERNAL_SERVER_ERROR
        )
        .json({
          success: false,
          message: error.reportError
            ? error.message
            : DeliverableConstant.MESSAGES.FETCHING_DELIVERABLES_FAILED,
        });
    }
  }
}

export default Deliverable;
