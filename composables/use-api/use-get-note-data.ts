import useAccount from "~/composables/use-account";
import type { GetNoteDataReturnType } from "~/server/api/note/[id].get";
import type { NoteDataType } from "~/utils/types";

export default function ({ noteId }: { noteId: string }) {
  const { account, accessToken } = storeToRefs(useAccount());

  // ------------------------------------------------------------------------------------------

  const url = computed<string>(() => {
    return `/api/note/${noteId}?account_id=${account.value?._id}`;
  });

  const {
    data: dataSource,
    status,
    ...others
  } = useAsyncData<GetNoteDataReturnType>(url.value, async () => {
    try {
      return await $fetch(url.value, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorData = (error as any).data;
      throw new Error(errorData.error);
    }
  });

  const data = computed<NoteDataType | null>(() => dataSource.value?.data?.note || null);

  const error = computed<string | undefined>(() => {
    if (others.error.value?.message) return others.error.value?.message;
    if (dataSource.value?.error) return dataSource.value?.error;
    return undefined;
  });

  const isSuccess = computed<boolean>(() => status.value === "success");

  const isError = computed<boolean>(() => status.value === "error");

  const isLoading = computed<boolean>(() => !isSuccess.value && !isError.value);

  const isEmpty = computed<boolean>(() => !dataSource.value?.data?.note);

  const isRefreshLoading = ref<boolean>(false);

  // ------------------------------------------------------------------------------------------

  async function refresh() {
    isRefreshLoading.value = true;
    await others.refresh();
    isRefreshLoading.value = false;
  }

  // ------------------------------------------------------------------------------------------

  return {
    dataSource,
    isLoading,
    isSuccess,
    isError,
    isEmpty,
    isRefreshLoading,
    error,
    data,
    refresh,
  };
}
