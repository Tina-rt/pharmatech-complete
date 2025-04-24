import fileDownload from 'js-file-download'



export const $api = async (
    url: string,
    options?: Parameters<typeof $fetch>[1],
): Promise<any> => {
    const token = useCookie('token');
    const apiBaseUrl = useRuntimeConfig().public.apiBase;

    return $fetch(`${apiBaseUrl}/${url}`, {
        ...options,
        headers: {
            Authorization: token.value ? `Bearer ${token.value}` : '',
            ...options?.headers,
        },
    });
};

export const $renderImage = (imgPath: string): string => {
    const apiParent = useRuntimeConfig().public.apiParent;
    const newUrl = new URL(`${apiParent}/${imgPath}`);
    return newUrl.toString();
};

export const $downloadFile = (path:string, filename:string) => {

    $api(path).then((res) => {
        // console.log(res)
        fileDownload(res, filename)
    })


}

