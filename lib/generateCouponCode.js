export function generateCouponCode(title = "", expiryDate) {
    // Convert the title to uppercase and remove spaces
    const titleCode = title.toUpperCase().replace(/\s/g, '');

    // const dateParts = expiryDate.split('-');
    // const expiryCode = dateParts[2] + dateParts[1] + dateParts[0];

    const formattedExpiryDate = expiryDate
        .slice(0, 10)
        .split("-")
        .reverse().join("")

    return `${titleCode}-${formattedExpiryDate}`;
}
