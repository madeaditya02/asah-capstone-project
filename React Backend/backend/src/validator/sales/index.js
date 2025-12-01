const {
  CreateSalesPayloadSchema,
  UpdateSalesPayloadSchema,
} = require("./schema");

const InvariantError = require("../../exceptions/InvariantError");

const SalesValidator = {
  validateCreatePayload: (payload) => {
    const { error } = CreateSalesPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },

  validateUpdatePayload: (payload) => {
    const { error } = UpdateSalesPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
};

module.exports = SalesValidator;
