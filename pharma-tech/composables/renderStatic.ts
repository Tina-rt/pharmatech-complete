export const useRenderStatic = () => {
    const apiBase = useRuntimeConfig().public.apiBase;

    const renderStatic = (filepath: string) => {
        return filepath.replace("~", "_nuxt");
    };

    const renderServerImg = (imgPath: string): string => {
        return new URL(`${apiBase}/${imgPath}`).toString();
    };

    return {
        renderStatic,
        renderServerImg,
    };
};
