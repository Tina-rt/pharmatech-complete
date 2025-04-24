export default () => {
    const apiURL = useRuntimeConfig().public.apiBase;

    return { apiURL };
};
