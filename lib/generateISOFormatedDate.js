
export function generateISOFormatedDate(dateString){
    const dateObject = new Date(dateString);
    const isoFormatedDate = dateObject.toISOString();
    return isoFormatedDate;
}