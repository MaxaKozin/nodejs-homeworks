const Joi = require("joi");

const validationSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{8,16}$/)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code === "string.pattern.base") {
          err.message = "'password' is not valid";
        }
      });
      return errors;
    }),

  subscription: Joi.string()
    .allow("free")
    .allow("pro")
    .allow("premium")
    .default("free"),
});

class Validator {
  constructor() {
    this.schema = validationSchema;
  }

  validate = async (userData) => {
    return await this.schema.validateAsync(userData);
  };
}

module.exports = new Validator();
