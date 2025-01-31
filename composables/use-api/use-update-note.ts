import useAccount from "~/composables/use-account";
import {
  type PutNoteDataRequestBodyType,
  type PutNoteDataReturnType,
} from "~/server/api/note/[id].put";

export default function ({ noteId }: { noteId: PutNoteDataRequestBodyType["_id"] }) {
  const { accessToken } = storeToRefs(useAccount());

  // ------------------------------------------------------------------------------------------

  const isLoading = ref<boolean>(false);

  const error = ref<PutNoteDataReturnType["error"]>(null);

  async function mutate(data: Pick<PutNoteDataRequestBodyType, "message">) {
    isLoading.value = true;

    if (!accessToken.value) {
      isLoading.value = false;
      throw new Error("[Unauthorized] Invalid access token");
    }

    try {
      await $fetch<PutNoteDataReturnType>(`/api/note/${noteId}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.value}`,
        },
        body: {
          ...data,
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
