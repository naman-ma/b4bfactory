module.exports = {
  EMAIL_NOT_FOUND: 'Email not provided',
  PASSWORD_NOT_FOUND: 'Password not provided',
  TOKEN_NOT_FOUND: 'Invalid request: Token not found!',
  TOKEN_INVALID: 'Unauthorized Access: You do not have access to this operation!',
  NO_ACCESS: 'Unauthorized Access: You do not have access to this operation!',
  VALIDATION_ERROR: 'Please fill all required fields!',
  ACCOUNT_EXISTS: 'We already have an account attached to this email!',
  PASSWORDS_NOT_MATCHING: 'Passwords do not match!',
  NOT_HAVE: (role) => {
    return 'This is not an ' + role + ' account!'
  },
  ACCOUNT_NOT_FOUND: 'We cannot find any account attached with this email, Please register first!',
  ACCOUNT_NOT_VERIFIED: 'Account inactive: Please verify your account!',
}
