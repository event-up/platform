/**
 * FormRenderer Testing Guide
 *
 * This file contains test cases and examples for validating FormRenderer functionality
 */

import { FormSchema, createValidationSchema, validateFormData } from "./index";
import { z } from "zod";

// ============================================================================
// TEST SUITE 1: Schema Validation
// ============================================================================

export const testSchemas = {
  // Test basic text field
  textFieldSchema: {
    title: "Text Field Test",
    fields: [
      {
        name: "username",
        type: "text" as const,
        label: "Username",
        required: true,
        validation: {
          minLength: 3,
          maxLength: 20,
        },
      },
    ],
  },

  // Test email field
  emailFieldSchema: {
    title: "Email Field Test",
    fields: [
      {
        name: "email",
        type: "email" as const,
        label: "Email",
        required: true,
      },
    ],
  },

  // Test phone field
  phoneFieldSchema: {
    title: "Phone Field Test",
    fields: [
      {
        name: "phone",
        type: "phone" as const,
        label: "Phone",
        required: true,
      },
    ],
  },

  // Test dropdown
  dropdownSchema: {
    title: "Dropdown Test",
    fields: [
      {
        name: "country",
        type: "dropdown" as const,
        label: "Country",
        required: true,
        options: [
          { label: "USA", value: "us" },
          { label: "Canada", value: "ca" },
        ],
      },
    ],
  },

  // Test multiselect
  multiselectSchema: {
    title: "Multiselect Test",
    fields: [
      {
        name: "interests",
        type: "multiselect" as const,
        label: "Interests",
        required: true,
        options: [
          { label: "Tech", value: "tech" },
          { label: "Sports", value: "sports" },
        ],
      },
    ],
  },

  // Test complex form
  complexSchema: {
    title: "Complex Form Test",
    fields: [
      {
        name: "fullName",
        type: "text" as const,
        label: "Full Name",
        required: true,
        validation: { minLength: 2 },
      },
      {
        name: "email",
        type: "email" as const,
        label: "Email",
        required: true,
      },
      {
        name: "phone",
        type: "phone" as const,
        label: "Phone",
        required: false,
      },
      {
        name: "preferences",
        type: "multiselect" as const,
        label: "Preferences",
        required: true,
        options: [
          { label: "Option A", value: "a" },
          { label: "Option B", value: "b" },
        ],
      },
    ],
  },
};

// ============================================================================
// TEST SUITE 2: Validation Test Cases
// ============================================================================

export const validationTestCases = {
  // Valid data
  validData: {
    textField: {
      username: "johnDoe",
    },
    email: {
      email: "john@example.com",
    },
    phone: {
      phone: "+1 (555) 000-0000",
    },
    multiselect: {
      interests: ["tech", "sports"],
    },
  },

  // Invalid data
  invalidData: {
    textFieldTooShort: {
      username: "ab", // Less than minLength: 3
    },
    textFieldTooLong: {
      username: "a".repeat(21), // More than maxLength: 20
    },
    invalidEmail: {
      email: "notanemail",
    },
    invalidPhone: {
      phone: "123", // Not a valid phone
    },
    missingRequired: {
      username: "", // Required but empty
    },
  },
};

// ============================================================================
// TEST SUITE 3: Helper Functions
// ============================================================================

/**
 * Test that schema validation works correctly
 */
export async function testSchemaValidation() {
  console.log("Testing schema validation...");

  const schema = testSchemas.textFieldSchema as FormSchema;
  const validationSchema = createValidationSchema(schema);

  // Test valid data
  const validResult = await validateFormData(
    { username: "validUser" },
    validationSchema
  );
  console.assert(
    validResult.success === true,
    "Valid data should pass validation"
  );
  console.assert(
    validResult.data?.username === "validUser",
    "Valid data should be returned"
  );

  // Test invalid data
  const invalidResult = await validateFormData(
    { username: "ab" },
    validationSchema
  );
  console.assert(
    invalidResult.success === false,
    "Invalid data should fail validation"
  );
  console.assert(
    invalidResult.errors?.username,
    "Error message should be present"
  );

  console.log("✓ Schema validation tests passed");
}

/**
 * Test email field validation
 */
export async function testEmailValidation() {
  console.log("Testing email validation...");

  const schema = testSchemas.emailFieldSchema as FormSchema;
  const validationSchema = createValidationSchema(schema);

  // Valid emails
  const validEmails = [
    "user@example.com",
    "test.email@domain.co.uk",
    "name+tag@example.com",
  ];

  for (const email of validEmails) {
    const result = await validateFormData({ email }, validationSchema);
    console.assert(result.success === true, `Email ${email} should be valid`);
  }

  // Invalid emails
  const invalidEmails = [
    "notanemail",
    "user@",
    "@example.com",
    "user @example.com",
  ];

  for (const email of invalidEmails) {
    const result = await validateFormData({ email }, validationSchema);
    console.assert(
      result.success === false,
      `Email ${email} should be invalid`
    );
  }

  console.log("✓ Email validation tests passed");
}

/**
 * Test phone field validation
 */
export async function testPhoneValidation() {
  console.log("Testing phone validation...");

  const schema = testSchemas.phoneFieldSchema as FormSchema;
  const validationSchema = createValidationSchema(schema);

  // Valid phone numbers
  const validPhones = [
    "+1-555-000-0000",
    "+1(555)000-0000",
    "+15550000000",
    "555-000-0000",
  ];

  for (const phone of validPhones) {
    const result = await validateFormData({ phone }, validationSchema);
    console.assert(result.success === true, `Phone ${phone} should be valid`);
  }

  // Invalid phone numbers
  const invalidPhones = ["123", "555", "not-a-phone"];

  for (const phone of invalidPhones) {
    const result = await validateFormData({ phone }, validationSchema);
    console.assert(
      result.success === false,
      `Phone ${phone} should be invalid`
    );
  }

  console.log("✓ Phone validation tests passed");
}

/**
 * Test required field validation
 */
export async function testRequiredValidation() {
  console.log("Testing required field validation...");

  const schema = testSchemas.textFieldSchema as FormSchema;
  const validationSchema = createValidationSchema(schema);

  // Empty required field
  const result = await validateFormData({ username: "" }, validationSchema);
  console.assert(
    result.success === false,
    "Required field should fail with empty value"
  );
  console.assert(
    result.errors?.username,
    "Error message should be present for required field"
  );

  console.log("✓ Required field validation tests passed");
}

/**
 * Test multiselect validation
 */
export async function testMultiselectValidation() {
  console.log("Testing multiselect validation...");

  const schema = testSchemas.multiselectSchema as FormSchema;
  const validationSchema = createValidationSchema(schema);

  // Valid - multiple selections
  const validResult = await validateFormData(
    { interests: ["tech", "sports"] },
    validationSchema
  );
  console.assert(
    validResult.success === true,
    "Multiple selections should be valid"
  );

  // Valid - single selection
  const singleResult = await validateFormData(
    { interests: ["tech"] },
    validationSchema
  );
  console.assert(
    singleResult.success === true,
    "Single selection should be valid"
  );

  // Invalid - empty array
  const emptyResult = await validateFormData(
    { interests: [] },
    validationSchema
  );
  console.assert(
    emptyResult.success === false,
    "Empty array should fail for required multiselect"
  );

  console.log("✓ Multiselect validation tests passed");
}

/**
 * Test complex form validation
 */
export async function testComplexFormValidation() {
  console.log("Testing complex form validation...");

  const schema = testSchemas.complexSchema as FormSchema;
  const validationSchema = createValidationSchema(schema);

  // Valid data
  const validData = {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 000-0000",
    preferences: ["a", "b"],
  };

  const validResult = await validateFormData(validData, validationSchema);
  console.assert(
    validResult.success === true,
    "Valid complex form should pass"
  );

  // Invalid data - multiple errors
  const invalidData = {
    fullName: "J", // Too short
    email: "notanemail",
    phone: "invalid",
    preferences: [], // Empty array for required field
  };

  const invalidResult = await validateFormData(invalidData, validationSchema);
  console.assert(
    invalidResult.success === false,
    "Invalid complex form should fail"
  );
  console.assert(
    Object.keys(invalidResult.errors || {}).length > 0,
    "Should have multiple error messages"
  );

  console.log("✓ Complex form validation tests passed");
}

// ============================================================================
// TEST RUNNER
// ============================================================================

/**
 * Run all validation tests
 */
export async function runAllValidationTests() {
  console.log("\n=== FORMRENDERER VALIDATION TEST SUITE ===\n");

  try {
    await testSchemaValidation();
    await testEmailValidation();
    await testPhoneValidation();
    await testRequiredValidation();
    await testMultiselectValidation();
    await testComplexFormValidation();

    console.log("\n✓ ALL TESTS PASSED\n");
  } catch (error) {
    console.error("\n✗ TEST SUITE FAILED\n", error);
  }
}

// ============================================================================
// USAGE
// ============================================================================

/**
 * To run these tests in development:
 *
 * 1. Import the test runner in your app
 * 2. Call runAllValidationTests() in a useEffect or on app load
 * 3. Check the console for test results
 *
 * Example:
 * ```tsx
 * import { runAllValidationTests } from '@workspace/surveyjs/lib/renderer/testing';
 *
 * useEffect(() => {
 *   if (process.env.NODE_ENV === 'development') {
 *     runAllValidationTests();
 *   }
 * }, []);
 * ```
 */
