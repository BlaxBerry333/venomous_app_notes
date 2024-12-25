<script setup lang="ts">
import useAccount from "~/composables/use-account";
import useTranslation from "~/composables/core/use-translation";

import layoutPageContentWrapper from "~/components/layout-components/layout-page-content-wrapper.vue";
import customFieldPassword from "~/components/custom/form/custom-field-password.vue";
import customFieldText from "~/components/custom/form/custom-field-text.vue";
import type {
  CustomFormFieldRulesType,
  CustomFormValidationResultType,
} from "~/components/custom/form/types";
import { emailValidation, passwordValidation } from "~/utils/validations/form-field-validations";

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();

// ------------------------------------------------------------------------------------------

const email = ref<string>("");

const emailRules = ref<CustomFormFieldRulesType>([
  (v: string) => !!v || t("form.errors.is-required"),
  (v: string) => emailValidation.checkRegexp(v) || t("form.errors.is-email"),
]);

const password = ref<string>("");

const passwordRules = ref<CustomFormFieldRulesType>([
  (v: string) => !!v || t("form.errors.is-required"),
  (v: string) =>
    passwordValidation.checkMinLength(v) ||
    t("form.errors.min-length", { length: passwordValidation.minLength }),
  (v: string) =>
    passwordValidation.checkMaxLength(v) ||
    t("form.errors.max-length", { length: passwordValidation.maxLength }),
]);

// ------------------------------------------------------------------------------------------

const account = useAccount();
async function handleFormSubmit(validationResult: CustomFormValidationResultType) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (validationResult.valid) {
    account.handleLogoIn({
      email: email.value,
      password: password.value,
    });
  }
}
</script>

<template>
  <layout-page-content-wrapper :page-title="t('nav.account-signin')" :show-page-title="false">
    <section
      class="w-100 h-100 d-flex flex-column align-center justify-center"
      :style="{ marginTop: '-60px' }"
    >
      <h1 id="signin-page-title" class="text-h4 text-md-h3 font-weight-black">
        {{ t("pages-contents.account-signin-page.title") }}
      </h1>
      <div class="my-6" />
      <custom-form :handle-submit="handleFormSubmit">
        <template #default="{ isLoading }">
          <custom-field-text
            :label="t('form.labels.email-address')"
            v-model="email"
            :rules="emailRules"
            :isDisabled="isLoading"
          />

          <custom-field-password
            :label="t('form.labels.password')"
            v-model="password"
            :rules="passwordRules"
            :isDisabled="isLoading"
          />

          <section class="w-100 d-flex flex-column flex-md-row justify-center align-center mt-6">
            <v-btn type="submit" :loading="isLoading" class="w-100 w-md-50">
              {{ t("buttons.login") }}
            </v-btn>
            <div class="px-0 py-2 px-md-0 px-md-1"></div>
            <v-btn type="submit" :loading="isLoading" class="w-100 w-md-50">
              {{ t("buttons.signup") }}
            </v-btn>
          </section>
        </template>
      </custom-form>
    </section>
  </layout-page-content-wrapper>
</template>

<style scoped lang="scss">
#signin-page-title {
  letter-spacing: -2px !important;
  font-family:
    ui-sans-serif,
    system-ui,
    sans-serif,
    Apple Color Emoji,
    Segoe UI Emoji,
    Segoe UI Symbol,
    Noto Color Emoji;
}
</style>
