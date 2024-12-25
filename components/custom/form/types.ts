import type { VForm } from "vuetify/components";

interface FieldValidationResult {
  id: number | string;
  errorMessages: string[];
}
interface FormValidationResult {
  valid: boolean;
  errors: FieldValidationResult[];
}

// ------------------------------------------------------------------------------------------

export type CustomFormReferenceType = VForm | null;

export type CustomFormValidationResultType = FormValidationResult;

export type CustomFormFieldRulesType = Array<(v: string) => boolean | string>;
