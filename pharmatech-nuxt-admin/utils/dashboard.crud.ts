export const getDashboardData = async () => {
    const { data } = await $api('dashboard');
    return data;
};
