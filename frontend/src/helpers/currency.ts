export function getCurrencyId(value) {
    return "Rp " + Intl.NumberFormat("id").format(value);
}
