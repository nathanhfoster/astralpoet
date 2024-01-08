/* eslint-disable no-useless-escape */
const isEmail = (email: string | number) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(`${email}`)) {
    return true;
  }

  return false;
};

export default isEmail;
