const cookie = document.cookie
  .split('; ')
  .find(row => row.startsWith('EmployeeData='))
  ?.split('=')[1];
  
export const currentUser = cookie ? JSON.parse(decodeURIComponent(cookie)) : null;