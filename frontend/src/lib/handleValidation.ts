export interface IFormInput {
  email: string;
  password: string;
}

// Login Validation
export function handleValidation(formData: IFormInput): boolean {
  let email_check = false;
  let password_check = false;

  // 길이가 10자 이상 30자 이하
  // [@ , .] 이 무조건 들어있어야 통과
  if (formData.email.length >= 10 && formData.email.length <= 30) {
    const mailformat =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (mailformat.test(formData.email)) {
      email_check = true;
    }
  }

  // 길이가 8자 이상 30자 이하
  // 영어 [대문자 , 숫자] 무조건 조합이 되어야 통과
  if (formData.password.length >= 8 && formData.password.length <= 30) {
    const mailformat = /(?=.?[a-z])(?=.?[0-9])/;
    if (mailformat.test(formData.password)) {
      password_check = true;
    }
  }

  if (password_check === false || email_check === false) {
    return false;
  }
  return true;
}
