import useAccount from "~/composables/use-account";
import {
  type PostNoteCreateRequestBodyType,
  type PostNoteCreateReturnType,
} from "~/server/api/note/create.post";

export default function () {
  const { account, accessToken } = storeToRefs(useAccount());

  // ------------------------------------------------------------------------------------------

  const isLoading = ref<boolean>(false);

  const error = ref<PostNoteCreateReturnType["error"]>(null);

  async function mutate(data: Omit<PostNoteCreateRequestBodyType, "account_id">) {
    isLoading.value = true;

    if (!accessToken.value) {
      isLoading.value = false;
      throw new Error("[Unauthorized] Invalid access token");
    }

    try {
      await $fetch<PostNoteCreateReturnType>("/api/note/create", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.value}`,
        },
        body: {
          ...data,
          ...(account.value?._id ? { account_id: account.value?._id } : {}),
        },
        onResponseError: async ({ response }) => {
          if (response._data.error) {
            error.value = response._data.error;
            alert(response._data.error);
          }
        },
      });

      navigateTo(PAGE_PATHNAME.noteList, { replace: true });
    } catch (e) {
      error.value = (e as Error).message;
    } finally {
      isLoading.value = false;
    }
  }

  // ------------------------------------------------------------------------------------------

  return {
    isLoading,
    mutate,
  };
}
