
export const generateUserUniqueCode = (prefix, name) => {


    const initials = name.split(" ").map(name => name[0]).join("").toUpperCase();
    const now = new Date();
    const timeStampCode = `${now.getFullYear()}${(now.getMonth()).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`

    const userUniqueCode = `${prefix}-${initials}-${timeStampCode}`
    return userUniqueCode;
}