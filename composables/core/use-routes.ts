export default function () {
  const { path } = toRefs(useRoute());

  const pathname = ref<string>(path.value);

  function checkIsCurrentPathname(newPath: string): boolean {
    return newPath === path.value;
  }

  watchEffect(() => {
    pathname.value = path.value;
  });

  // ------------------------------------------------------------------------------------------

  const { push, replace } = useRouter();

  function navigateTo(newPath: string, options?: { replace?: boolean }): void {
    if (checkIsCurrentPathname(newPath)) {
      return;
    }

    if (options?.replace) {
      replace(newPath);
    } else {
      push(newPath);
    }
  }

  // ------------------------------------------------------------------------------------------

  return {
    pathname,
    navigateTo,

    checkIsCurrentPathname,
  };
}
