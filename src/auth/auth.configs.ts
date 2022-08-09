export default () => ({
  jwt         : {
    secret     : process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRATION,
    },
  },
});
