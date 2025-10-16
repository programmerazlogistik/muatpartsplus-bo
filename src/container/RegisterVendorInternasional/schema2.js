import * as v from "valibot";

// --- Custom Schemas and Validators ---

// Define the maximum allowed file size
const MAX_FILE_SIZE_MB = 5 * 1024 * 1024; // 5MB in bytes

// Reusable messages based on provided screenshot errors
const REQUIRED_MSG = "Wajib diisi";
const MAX_SIZE_MSG = "Ukuran maksimal 5MB";
const INVALID_FORMAT_MSG = "Format tidak sesuai";

/**
 * Validates a required file input: ensures it's a File instance, size is <= 5MB, and has an allowed format.
 */
const requiredFileSchema = v.pipe(
  v.instance(File, REQUIRED_MSG),
  v.check((file) => file.size <= MAX_FILE_SIZE_MB, MAX_SIZE_MSG),
  v.check(
    (file) =>
      [
        "image/jpeg",
        "image/png",
        "application/pdf",
        "application/zip",
      ].includes(file.type),
    INVALID_FORMAT_MSG
  )
);

/**
 * Validates an optional file input: allows null, undefined, or a valid File instance.
 */
const optionalFileSchema = v.optional(
  v.nullable(
    v.pipe(
      v.instance(File, INVALID_FORMAT_MSG),
      v.check((file) => file.size <= MAX_FILE_SIZE_MB, MAX_SIZE_MSG),
      v.check(
        (file) =>
          [
            "image/jpeg",
            "image/png",
            "application/pdf",
            "application/zip",
          ].includes(file.type),
        INVALID_FORMAT_MSG
      )
    ),
    null
  ),
  null
);

/**
 * Standard required string field validation (matches 'Wajib diisi' error)
 */
const requiredStringSchema = v.pipe(
  v.string(REQUIRED_MSG),
  v.nonEmpty(REQUIRED_MSG)
);

// --- Exporter Legality (Repeatable Brand Section) Schema ---

const brandSchema = v.object({
  brand: v.picklist(["Isuzu", "Toyota", "Honda", "Mitsubishi"], REQUIRED_MSG),
  intellectualPropertyFile: optionalFileSchema,
  // Registration Date logic must handle string input from form fields
  registrationDate: v.pipe(
    v.string(REQUIRED_MSG),
    v.nonEmpty(REQUIRED_MSG),
    v.isoDate("Tanggal tidak valid")
  ),
  certificateOfOriginFile: requiredFileSchema,
});

// --- Main Form Schema Definition ---

export const vendorInternationalSchema = v.object({
  // Business Legal Entity
  businessLicenseFile: requiredFileSchema,
  companyRegistrationFile: requiredFileSchema,
  vatCertificateFile: optionalFileSchema,

  // Director Information
  directorIdFile: requiredFileSchema,
  directorIdNumber: requiredStringSchema, // Simplified
  fullName: requiredStringSchema, // Simplified
  position: requiredStringSchema, // Simplified
  directorStatementFile: requiredFileSchema,

  // Exporter Legality (Array of Brand Schemas)
  brands: v.pipe(
    v.array(brandSchema, "Daftar merek tidak valid."),
    v.minLength(1, "Minimal 1 merek harus ditambahkan.")
  ),

  // Product List
  productCatalogFile: optionalFileSchema,
});

// Ensure the code uses the updated schema
