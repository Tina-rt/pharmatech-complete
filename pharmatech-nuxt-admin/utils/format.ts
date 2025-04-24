export const $formatCurrency = (value: string | number, noSymbol = false) => {
    if (!value) return '0 MGA';
    let formatter = new Intl.NumberFormat('fr-FR', {
      style: "currency",
      currency: "MGA"
    });
    if (noSymbol) {
      formatter = new Intl.NumberFormat('fr-FR', {
        style: "decimal",
        minimumFractionDigits: 2,
      });
    }
    return formatter.format(+value);
};
