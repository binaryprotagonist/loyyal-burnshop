/** ********************* LOGIN SERVICES START ************************ */

import { apiService } from "./api.service";
import { AUTH } from "@/constants/url.constants";
import { ILoginValues, IUser } from "@/interfaces/auth.interface";

// Login
/**
 * @description Login
 * @param {}
 * @return IUser[]
 * @url /program/et/memberLogin
 * @method POST
 */

export const loginService = (data: ILoginValues): Promise<IUser> => {
  return apiService.post(`${AUTH.LOGIN}/${data.programCode}/memberLogin`, data);
};
