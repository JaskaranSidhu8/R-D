
type StrengthRequirement = {
  regex: RegExp;
  text: string;
};

export const checkPasswordStrength = (password: string) => {
  const requirements: StrengthRequirement[] = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /[0-9]/, text: "At least 1 number" },
    { regex: /[a-z]/, text: "At least 1 lowercase letter" },
    { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
  ];
  
  return requirements.map((req) => ({
    met: req.regex.test(password),
    text: req.text,
  }));
};
