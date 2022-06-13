import * as Yup from "yup";

const profileSchema = Yup.object({
  name: Yup.string().required("Company name is required"),
  pin: Yup.string().required("KRA PIN is required"),
  type: Yup.string().notRequired("Provide business type."),
  yearEnd: Yup.number()
    .positive()
    .integer()
    .notRequired("Select Accounting Period."),
  shares: Yup.number().positive().integer().required("Total shares."),
  paidUp: Yup.number().positive().integer().required("Paid up shares."),
  nominal: Yup.number().positive().integer().required("Share nominal value."),
});

export default profileSchema;
