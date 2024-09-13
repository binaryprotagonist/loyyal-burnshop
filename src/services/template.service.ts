import { apiService } from "./api.service";
import { TEMPLATE } from "@/constants/url.constants";
import { IComponentInstance, ITemplateInstance } from "@/interfaces/template.interface";

/** ********************* TEMPLATE SERVICES START ************************ */

// getTemplate
/**
 * @description getTemplate
 * @param {}
 * @return Promise<ITemplateInstance>
 * @url /template/getTemplateInstance?programCategoryId={programCategoryId}
 * @method POST
 */

export const getTemplate = (
  programCategoryId: number | undefined
): Promise<ITemplateInstance> => {
  return apiService.get(`${TEMPLATE.GET_TEMPLATE}${programCategoryId}`);
};

// getComponentInstances
/**
 * @description getComponentInstances
 * @param {}
 * @return {}
 * @url /template/getComponentInstances
 * @method POST
 */

export const getComponentInstances = (
  templateInstanceId: number
): Promise<IComponentInstance[]> => {
  return apiService.get(`${TEMPLATE.GET_COMPONENT_INSTANCES}${templateInstanceId}`);
};
