import { FormSchema } from "./types";

/**
 * Example Form Schemas
 * These demonstrate how to use the FormRenderer with various field types and validations
 */

/**
 * Contact Form Example
 * Demonstrates basic field types: text, email, phone
 */
export const contactFormSchema: FormSchema = {
  title: "Contact Us",
  description: "Please fill out this form to get in touch with us",
  fields: [
    {
      name: "fullName",
      type: "text",
      label: "Full Name",
      placeholder: "John Doe",
      required: true,
      validation: {
        minLength: 2,
        maxLength: 100,
        customMessage: "Name must be between 2 and 100 characters",
      },
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "john@example.com",
      required: true,
      description: "We'll never share your email address",
    },
    {
      name: "phone",
      type: "phone",
      label: "Phone Number",
      placeholder: "+1 (555) 000-0000",
      required: false,
    },
    {
      name: "message",
      type: "text",
      label: "Message",
      placeholder: "Your message here...",
      required: true,
      validation: {
        minLength: 10,
        maxLength: 500,
      },
    },
  ],
};

/**
 * Event Registration Form Example
 * Demonstrates dropdown, single select, and multi-select
 */
export const eventRegistrationSchema: FormSchema = {
  title: "Event Registration",
  description: "Register for our upcoming conference",
  fields: [
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
      required: true,
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      required: true,
    },
    {
      name: "eventType",
      type: "dropdown",
      label: "Event Type",
      required: true,
      options: [
        { label: "Conference", value: "conference" },
        { label: "Workshop", value: "workshop" },
        { label: "Webinar", value: "webinar" },
        { label: "Networking Event", value: "networking" },
      ],
    },
    {
      name: "ticketType",
      type: "select",
      label: "Ticket Type",
      required: true,
      options: [
        { label: "General Admission", value: "general" },
        { label: "VIP", value: "vip" },
        { label: "Student", value: "student" },
      ],
    },
    {
      name: "interests",
      type: "multiselect",
      label: "Areas of Interest",
      required: true,
      options: [
        { label: "Technology", value: "tech" },
        { label: "Business", value: "business" },
        { label: "Marketing", value: "marketing" },
        { label: "Design", value: "design" },
      ],
      description: "Select all that apply",
    },
  ],
};

/**
 * Survey Form Example
 * Demonstrates various input types and custom validation
 */
export const surveyFormSchema: FormSchema = {
  title: "Customer Satisfaction Survey",
  description: "Help us improve by sharing your feedback",
  fields: [
    {
      name: "customerName",
      type: "text",
      label: "Your Name",
      required: true,
      validation: {
        minLength: 3,
        customMessage: "Please enter a valid name",
      },
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      required: false,
    },
    {
      name: "department",
      type: "dropdown",
      label: "Which department did you interact with?",
      required: true,
      options: [
        { label: "Sales", value: "sales" },
        { label: "Support", value: "support" },
        { label: "Development", value: "dev" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "satisfaction",
      type: "select",
      label: "How satisfied are you?",
      required: true,
      options: [
        { label: "Very Satisfied", value: "5" },
        { label: "Satisfied", value: "4" },
        { label: "Neutral", value: "3" },
        { label: "Dissatisfied", value: "2" },
        { label: "Very Dissatisfied", value: "1" },
      ],
    },
    {
      name: "feedback",
      type: "text",
      label: "Additional Feedback",
      required: false,
      validation: {
        maxLength: 500,
      },
      description: "Optional: Tell us more about your experience",
    },
    {
      name: "topics",
      type: "multiselect",
      label: "Topics you'd like us to focus on",
      options: [
        { label: "Product Quality", value: "quality" },
        { label: "Customer Service", value: "service" },
        { label: "Pricing", value: "pricing" },
        { label: "Documentation", value: "docs" },
      ],
    },
  ],
};

/**
 * Registration Form with Phone Validation
 * Demonstrates phone field with custom validation
 */
export const userRegistrationSchema: FormSchema = {
  title: "Create Account",
  description: "Sign up for your free account",
  fields: [
    {
      name: "username",
      type: "text",
      label: "Username",
      placeholder: "Enter your username",
      required: true,
      validation: {
        minLength: 3,
        maxLength: 20,
        pattern: "^[a-zA-Z0-9_-]+$",
        customMessage:
          "Username must be 3-20 characters, alphanumeric and underscores/hyphens only",
      },
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      required: true,
    },
    {
      name: "phone",
      type: "phone",
      label: "Phone Number",
      required: true,
    },
    {
      name: "country",
      type: "dropdown",
      label: "Country",
      required: true,
      options: [
        { label: "United States", value: "us" },
        { label: "Canada", value: "ca" },
        { label: "United Kingdom", value: "uk" },
        { label: "Australia", value: "au" },
      ],
    },
    {
      name: "interests",
      type: "multiselect",
      label: "Your Interests",
      required: true,
      options: [
        { label: "Sports", value: "sports" },
        { label: "Music", value: "music" },
        { label: "Travel", value: "travel" },
        { label: "Technology", value: "tech" },
      ],
    },
  ],
};
