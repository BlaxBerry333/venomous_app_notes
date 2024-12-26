import {
  type PostNoteCreateRequestBodyType,
  type PostNoteCreateReturnType,
} from "~/server/api/note/create.post";

export default function () {
  // ------------------------------------------------------------------------------------------

  const isLoading = ref<boolean>(false);

  const error = ref<PostNoteCreateReturnType["error"]>(null);

  async function mutate(data: PostNoteCreateRequestBodyType) {
    isLoading.value = true;

    try {
      await $fetch<PostNoteCreateRequestBodyType>("/api/note/create", {
        method: "post",
        body: data,
      });
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
