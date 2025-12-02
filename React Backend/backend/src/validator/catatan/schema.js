const Joi = require("joi");

const PostCatatanPayloadSchema = Joi.object({
  deskripsi: Joi.string().required().messages({
    "string.empty": "Deskripsi wajib diisi",
    "any.required": "Deskripsi tidak boleh kosong",
  }),
  waktuDihubungi: Joi.string().required(),
  durasi: Joi.string().required(),
  statusId: Joi.string().required().messages({
    "string.empty": "Status wajib diisi",
    "any.required": "Status tidak boleh kosong",
  }),
});

const UpdateCatatanPayloadSchema = Joi.object({
  deskripsi: Joi.string().required().messages({
    "string.empty": "Deskripsi wajib diisi",
    "any.required": "Deskripsi tidak boleh kosong",
  }),
  durasi: Joi.string().required(),
  statusId: Joi.string().required().messages({
    "string.empty": "Status wajib diisi",
    "any.required": "Status tidak boleh kosong",
  }),
});

const GetDeleteCatatanByIdPayloadSchema = Joi.object({
  catatanId: Joi.string().required(),
});

module.exports = {
  PostCatatanPayloadSchema,
  UpdateCatatanPayloadSchema,
  GetDeleteCatatanByIdPayloadSchema,
};
