import useAccount from "~/composables/use-account";
import type { GetNoteListQueriesType, GetNoteListReturnType } from "~/server/api/note/list.get";
import type { NoteDataType } from "~/utils/types";

export default function ({
  selectedNoteType,
}: {
  selectedNoteType?: GetNoteListQueriesType["type"];
}) {
  const { accessToken } = storeToRefs(useAccount());

  // ------------------------------------------------------------------------------------------

  const url = computed<string>(() => {
    const baseUrl: string = "/api/note/list";
    if (selectedNoteType === undefined) return baseUrl;
    return `${baseUrl}&type=${selectedNoteType}`;
  });

  const {
    data: dataSource,
    status,
    ...others
  } = useAsyncData<GetNoteListReturnType>(url.value, async () => {
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

  // ------------------------------------------------------------------------------------------

  const data = computed<Array<NoteDataType>>(() => dataSource?.value?.data?.notes || []);

  const error = computed<string | undefined>(() => {
    if (others.error.value?.message) return others.error.value?.message;
    if (dataSource.value?.error) return dataSource.value?.error;
    return undefined;
  });

  const isSuccess = computed<boolean>(() => status.value === "success");

  const isError = computed<boolean>(() => status.value === "error");

  const isLoading = computed<boolean>(() => !isSuccess.value && !isError.value);

  const isEmpty = computed<boolean>(() => data.value.length === 0);

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
