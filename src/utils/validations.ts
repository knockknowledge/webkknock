export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone: string) => {
  const re = /^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{7,15}\s*,?$/;
  return re.test(phone);
};

export const validateZipCode = (zipCode: string) => {
  const re = /^\d{5}$/;
  return re.test(zipCode);
};
