// This function returns number with comma separated.
export const splitNumberWithCommas = (x) => {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };
  
 //method to get the current date
 export const currentDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  
  today = yyyy + '-' + mm + '-' + dd;
  return today;
 }