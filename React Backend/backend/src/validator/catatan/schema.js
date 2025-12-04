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
  nasabahId: Joi.string().required().messages({
    "any.required": "Id nasabah tidak boleh kosong",
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
  nasabahId: Joi.string().required().messages({
    "any.required": "Id nasabah tidak boleh kosong",
  }),
  catatanId: Joi.string().required().messages({
    "any.required": "Id catatan tidak boleh kosong",
  }),
});

const DeleteCatatanByIdPayloadSchema = Joi.object({
  catatanId: Joi.string().required(),
  nasabahId: Joi.string().required().messages({
    "any.required": "Id nasabah tidak boleh kosong",
  }),
  catatanId: Joi.string().required().messages({
    "any.required": "Id catatan tidak boleh kosong",
  }),
});

module.exports = {
  PostCatatanPayloadSchema,
  UpdateCatatanPayloadSchema,
  GetDeleteCatatanByIdPayloadSchema,
};
