const InvariantError = require("../../exceptions/InvariantError");
const { PostCatatanPayloadSchema, UpdateCatatanPayloadSchema, GetDeleteCatatanByIdPayloadSchema } = require("./schema");

const CatatanValidator = {
  validatePostCatatanPayload: (payload) => {
    const validationResult = PostCatatanPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateUpdateCatatanPayload: (payload) => {
    const validationResult = UpdateCatatanPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateGetDeleteCatatanPayload: (payload) => {
    const validationResult = GetDeleteCatatanByIdPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = CatatanValidator;
