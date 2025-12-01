
const Joi = require('joi');

const CreateSalesPayloadSchema = Joi.object({
  nama: Joi.string().required(),
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string().min(6).required(),
});

const UpdateSalesPayloadSchema = Joi.object({
  nama: Joi.string().optional(),
  email: Joi.string().email({ tlds: false }).optional(),
  password: Joi.string().min(6).optional(),
});

module.exports = {
  CreateSalesPayloadSchema,
  UpdateSalesPayloadSchema,
};
