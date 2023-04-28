export function checkPassword(password) {
  /*^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$

      ---

      ^.*              : Start
  (?=.{8,})        : Length
  (?=.*[a-zA-Z])   : Letters
  (?=.*\d)         : Digits
  (?=.*[!#$%&?."]) : Special characters
      .*$              : End*/
  const regex = /^.*(?=.{8,20})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?".]).*$/;
  return regex.test(password);
}

export function checkEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}