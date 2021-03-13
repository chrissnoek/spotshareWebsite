module.exports = {
  definition: `
    extend type UsersPermissionsMe {
      slug: String
    }
    extend input UsersPermissionsRegisterInput {
      slug: String
      firstname: String
      lastname: String
    }
  `,
};
