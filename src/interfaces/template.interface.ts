export interface ITemplateInstance {
  id: number;
  templateId: number;
  programCategoryId: number;
  createdDate: string;
  updatedDate: string;
}

// interface IComponentInstanceConfig {
//   link?: string;
//   imageURLs: string[] | string;
//   overlayText?: {
//     heading: string;
//     description: string;
//   };
// }

// interface IComponentInstanceConfigForTemplateOne {
//   link?: string;
//   imageURLs: any;
//   overlayText?: {
//     text: string;
//     position: {
//       x: number;
//       y: number;
//     };
//   };
// }

export interface IComponentInstance {
  id: number;
  componentId: number;
  componentInstanceConfig: any;
  createdDate: string;
  updatedDate: string;
}
