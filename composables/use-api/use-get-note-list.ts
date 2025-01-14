import type { GetNoteListQueriesType, GetNoteListReturnType } from "~/server/api/note/list.get";
import type { NoteDataType } from "~/utils/types";

export default function ({
  selectedNoteType,
}: {
  selectedNoteType?: GetNoteListQueriesType["type"];
}) {
  // ------------------------------------------------------------------------------------------

  const url = computed<string>(() => {
    if (selectedNoteType === undefined) return "/api/note/list";
    return `/api/note/list?type=${selectedNoteType}`;
  });

  const {
    data: dataSource,
    status,
    ...others
  } = useAsyncData<GetNoteListReturnType>(url.value, () => $fetch(url.value));

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

  const isEmpty = computed<boolean>(
    () => isSuccess.value && dataSource.value?.data?.notes.length === 0,
  );

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
