import { NextFunction, Request, Response } from "express";
import { User, UserRequest } from "../interfaces/Auth";
import { Exception, Validators, config } from "../helpers";
import { ErrorCodes, UserConstants } from "../constants";
import ApiClient from "../services/ApiClient";

class Authentication extends ApiClient {

  static async authenticate(req: Request, res: Response, next: NextFunction) {

    try {
      const { authorization = '' } = req.headers;


      const tokenSplitted = Validators.isValidStr(authorization) ? authorization.split(' ') : null;

      if (!Array.isArray(tokenSplitted) || tokenSplitted.length < 1) {

        console.log(tokenSplitted?.length);

        console.log(`authenticate:: Token is invalid. token:: `, tokenSplitted);

        throw new Exception(UserConstants.MESSAGES.TOKEN_IS_INVALID_OR_EXPIRED, ErrorCodes.CONFLICT_WITH_CURRENT_STATE);

      }

      const token = tokenSplitted[1];

      const user: User = await Authentication.get(config.auth0.userInfoUrl, {}, {
        authorization: `Bearer ${token}`
      });

      if (!user) {

        console.log(`authenticate:: Token is invalid, no user found. token:: ${token} decoded:: `);

        throw new Exception(UserConstants.MESSAGES.TOKEN_IS_INVALID_OR_EXPIRED, ErrorCodes.CONFLICT_WITH_CURRENT_STATE);

      }

      (req as UserRequest).user = user;

      next();

    } catch (error) {

      return res.status(ErrorCodes.UNAUTHORIZED).json({
        message: UserConstants.MESSAGES.INVALID_AUTHENTICATION_TOKEN
      });

    }

  }

}

export default Authentication;
