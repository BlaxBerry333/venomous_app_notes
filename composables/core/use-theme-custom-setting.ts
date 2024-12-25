import useTheme from "./use-theme";

export default function (): void {
  const vuetifyTheme = useTheme();

  // ------------------------------------------------------------------------------------------

  onMounted(() => {
    const primaryColor: string = vuetifyTheme.current.value.colors.primary;
    const style = document.createElement("style");
    style.innerHTML = `
        /* 设置选中文本的样式 */
        ::selection {
          background-color: ${primaryColor};                              /* 设置选中文本的背景色 */
          color: white;                                                   /* 设置选中文本的文字颜色 */
        }

        /* 设置滚动条的样式 */
        ::-webkit-scrollbar {
          width: 8px;                                                     /* 设置滚动条的宽度 */
          height: 8px;                                                    /* 设置滚动条的高度 */
        }
        ::-webkit-scrollbar-thumb {
          background-color: ${primaryColor};                              /* 设置滚动条的颜色 */
          border-radius: 4px;                                             /* 设置滚动条的圆角 */
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: darken(${primaryColor}, 10%);                 /* 悬停时加深颜色 */
        }
        ::-webkit-scrollbar-track {
          background-color: rgba(0, 0, 0, 0.1);                         /* 滑轨颜色 */
          border-radius: 4px;                                             /* 圆角 */
        }
        /* Firefox 滚动条样式 */
        * {
          scrollbar-color: ${primaryColor} rgba(0, 0, 0, 0.1);          /* 滑块 和 滑轨颜色 */
          scrollbar-width: thin;                                          /* 滚动条宽度 */
        }
      `;
    document.head.appendChild(style);
  });
}
