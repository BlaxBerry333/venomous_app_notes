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

const displayName = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const checkPassword = ref<string>("");

const emailRules = ref<CustomFormFieldRulesType>([
  (v: string) => !!v || t("form.errors.is-required"),
  (v: string) => emailValidation.checkRegexp(v) || t("form.errors.is-email"),
]);
const passwordRules = ref<CustomFormFieldRulesType>([
  (v: string) => !!v || t("form.errors.is-required"),
  (v: string) =>
    passwordValidation.checkMinLength(v) ||
    t("form.errors.min-length", { length: passwordValidation.minLength }),
  (v: string) =>
    passwordValidation.checkMaxLength(v) ||
    t("form.errors.max-length", { length: passwordValidation.maxLength }),
]);
const checkPasswordRules = ref<CustomFormFieldRulesType>([
  (v: string) => !!v || t("form.errors.is-required"),
  (v: string) => v === password.value || t("form.errors.password-not-match"),
]);

// ------------------------------------------------------------------------------------------

const account = useAccount();
async function handleFormSubmit(validationResult: CustomFormValidationResultType) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (validationResult.valid) {
    account.handleSignup({
      display_name: displayName.value,
      email: email.value,
      password: password.value,
    });
  }
}
</script>

<template>
  <layout-page-content-wrapper :page-title="t('nav.account-signup')" :show-page-title="false">
    <section
      class="w-100 h-100 w-md-50 mx-auto d-flex flex-column align-center justify-center"
      :style="{ marginTop: '-60px' }"
    >
      <h1 id="signup-page-title" class="text-h4 text-md-h3 font-weight-black">
        {{ t("pages-contents.account-signup-page.title") }}
      </h1>
      <div class="my-6" />
      <custom-form :handle-submit="handleFormSubmit">
        <template #default="{ isLoading }">
          <custom-field-text
            :label="t('form.labels.display-name')"
            v-model="displayName"
            :rules="undefined"
            :isDisabled="isLoading"
          />

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

          <custom-field-password
            :label="t('form.labels.check-password')"
            v-model="checkPassword"
            :rules="checkPasswordRules"
            :isDisabled="isLoading"
          />

          <section class="w-100 d-flex flex-column justify-center align-center mt-6">
            <v-btn type="submit" :loading="isLoading" class="w-100">
              {{ t("buttons.signup") }}
            </v-btn>
            <div class="px-0 py-2 px-mt-0 px-mt-1">
              <nuxt-link :to="{ name: 'account-signin' }" class="text-primary">
                {{ t("pages-contents.account-signup-page.navigate-to-signin") }}
              </nuxt-link>
            </div>
          </section>
        </template>
      </custom-form>
    </section>
  </layout-page-content-wrapper>
</template>

<style scoped lang="scss">
#signup-page-title {
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
