export default function ({ pageTitle }: { pageTitle: string }) {
  const config = useRuntimeConfig();

  useHead({
    title: `${config.public.appInfo.name} | ${pageTitle}`,
    meta: [
      {
        name: "description",
        content: `${config.public.appInfo.name} ${pageTitle}`,
      },
    ],
  });
}
