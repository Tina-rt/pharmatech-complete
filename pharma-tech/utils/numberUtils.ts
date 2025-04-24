export const $formatCurrency = (value: string | number) => {
    if (!value) return '0 MGA';
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'MGA',
    }).format(+value);
}