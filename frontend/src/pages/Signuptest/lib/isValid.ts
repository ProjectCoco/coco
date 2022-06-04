const isValid = (inputString: string, keyword: string) => {
  const emailFormat =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const passwordFormat = /(?=.?[a-z])(?=.?[0-9])/;
  const usernameFormat = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;

  const checkResult = [];
  let passwordPrev = '';

  switch (keyword) {
    // 이메일 유효성 검사
    // 길이 10자 이상 30자 이하, [@ , .] 이 포함되어야 통과
    case 'email':
      if (String(inputString).length < 1) return '';
      else if (
        !emailFormat.test(inputString as string) ||
        String(inputString).length < 10 ||
        String(inputString).length > 30
      ) {
        return '이메일 형식을 확인해주세요.';
      } else return '';
    // 비밀번호 유효성 검사
    // 길이 8자 이상 30자 이하, 영문 소문자, 숫자가 최소 1자 이상 포함되어야 통과
    case 'password':
      if (String(inputString).length < 1) return '';
      else if (
        !passwordFormat.test(inputString as string) ||
        String(inputString).length < 8 ||
        String(inputString).length > 30
      )
        return '비밀번호는 영문 소문자, 숫자를 포함하여 8자 이상 30자 이하로 입력해주세요.';
      else {
        passwordPrev += String(inputString);
        return '';
      }
    // 비밀번호 확인 유효성 검사
    // 길이 8자 이상 30자 이하, 영문 소문자, 숫자가 최소 1자 이상 포함 && 비밀번호와 일치해야 통과
    case 'passwordConfirm':
      if (String(inputString).length < 1) return '';
      else if (inputString !== passwordPrev) {
        return '비밀번호가 일치하지 않습니다.';
      } else return '';
    // 사용자 이름 유효성 검사
    // 영문 또는 한글 또는 숫자 포함하여 길이 2자 이상 16자 이하로 작성되어야 통과
    case 'username':
      if (String(inputString).length < 1) return '';
      else if (
        String(inputString).length <= 2 ||
        String(inputString).length > 16 ||
        !usernameFormat.test(inputString as string)
      )
        return '유저이름은 영문 또는 숫자 또는 한글을 포함하여 2자 이상 16자 이하로 입력해주세요.';
      else return '';
  }
};

export default isValid;
