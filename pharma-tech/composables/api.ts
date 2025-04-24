export const $api = async (
    url: string,
    options?: Parameters<typeof $fetch>[1]
): Promise<any> => {
    const token = useCookie("token");
    const apiBaseUrl = useRuntimeConfig().public.apiBase;
    try {
        return $fetch(`${apiBaseUrl}/api/${url}`, {
            ...options,
            headers: {
                Authorization: token.value ? `Bearer ${token.value}` : "",
                ...options?.headers,
            },
        });
    } catch (e) {
        console.error(e)
    }
};

export const $renderImage = (imgPath: string): string => {
    const apiParent = useRuntimeConfig().public.apiBase;
    const newUrl = new URL(`${apiParent}/${imgPath}`);
    return newUrl.toString();
};
