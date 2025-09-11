export default function getInitials(fullName) {
    if (!fullName) return "";

    const parts = fullName.trim().split(" ");

    if (parts.length === 1) {
        // Only first name
        return parts[0][0].toUpperCase();
    }

    // First + Last name initials
    const first = parts[0][0].toUpperCase();
    const last = parts[parts.length - 1][0].toUpperCase();

    return first + last;
}

// Examples
// console.log(getInitials("John Smith"));       // "JS"
// console.log(getInitials("John"));             // "J"
// console.log(getInitials("Alice Bob Carol"));  // "AC"
