import Joi from "joi";
import mongoose, { Schema } from "mongoose";
interface ISection {
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  image: string;
  type: string;
  alignment: string;
  _id?: string;
}

const sectionSchem = new Schema<ISection>({
  title_en: {
    type: String,
    default: "",
  },
  title_ar: {
    type: String,
    default: "",
  },
  description_en: {
    type: String,
    default: "",
  },
  description_ar: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    enum: ["slider", "banner", "aboutus", "privacy"],
  },
  alignment: {
    type: String,
  },
});
const Section = mongoose.model("Section", sectionSchem);
export default Section;
export const sectionValidation = (section: ISection, reqType: any) => {
  const schema = Joi.object({
    type: Joi.string().valid("slider", "banner", "aboutus", "privacy"),
    title: Joi.alternatives().conditional("type", [
      { is: "slider", then: Joi.optional() },
      { is: "aboutus", then: Joi.string().required() },
      { is: "privacy", then: Joi.string().required() },
    ]),
    description: Joi.alternatives().conditional("type", [
      { is: "slider", then: Joi.optional() },
      { is: "aboutus", then: Joi.string().required() },
      { is: "privacy", then: Joi.string().required() },
    ]),
    image: Joi.alternatives().conditional("type", [
      { is: "slider", then: Joi.string().required() },
      { is: "banner", then: Joi.string().required() },
      { is: "aboutus", then: Joi.string().required() },
    ]),
    alignment: Joi.when("type", [
      {
        is: "banner",
        then: Joi.string().required(),
        otherwise: Joi.optional(),
      },
    ]).valid("horizontal", "vertical"),
  });
  return schema.tailor(reqType).validate(section);
};
