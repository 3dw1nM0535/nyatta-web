import { isValidPhoneNumber } from "libphonenumber-js";
import { array, object, number, string } from "yup";

export const DescriptionSchema = object().shape({
  name: string()
    .trim()
    .matches(/^[A-Z0-9a-z ]+$/i, {
      message: "Property name should be alphanumeric",
      excludeEmptyString: true,
    })
    .required("Property name is required"),
});

export const LocationSchema = object().shape({
  town: object()
    .shape({
      id: string(),
      label: string(),
      postalCode: string(),
      value: string(),
    })
    .required("Town is required"),
});

export const PriceSchema = object().shape({
  minPrice: number()
    .min(1, "Not valid")
    .required("Minimum price is required"),
  maxPrice: number()
    .min(1, "Not valid")
    .required("Maximum price is required"),
});

export const UnitsSchema = object().shape({
  units: array()
    .of(
      object().shape({
        name: string()
          .trim()
          .matches(/^[a-zA-Z0-9 ]+$/i, {
            message: "Unit name should be alphabetic",
            excludeEmptyString: true,
          })
          .required("Unit name required"),
        type: string().required("Type is required"),
        baths: number()
          .min(1, "Zero is not valid")
          .required("Number of baths required"),
        price: number()
          .min(1, "Zero is not valid")
          .required("This is required"),
      })
    )
    .required("If you got here, your property units need to be registered"),
});

export const CaretakerSchema = object().shape({
  firstName: string()
    .matches(/^[a-zA-Z ]+$/i, {
      message: "First name should be alphabetic",
      excludeEmptyString: true,
    })
    .required("First name required"),
  lastName: string()
    .matches(/^[a-zA-Z ]+$/i, {
      message: "Last name should be alphabetic",
      excludeEmptyString: true,
    })
    .required("Last name required"),
  phoneNumber: string()
    .required("Phone number required")
    .matches(/^[0-9]+$/i, {
      message: "Expects phone number",
      excludeEmptyString: true,
    })
    .test("valid-phone", "Invalid phone number", (value) =>
      isValidPhoneNumber(value!, "KE")
    ),
  idVerification: string().required("ID verification required"),
  countryCode: string().required("Country code required"),
});

export const PropertyTypeSchema = object().shape({
  propertyType: string().required("Type is required"),
});

export const ContactPersonSchema = object().shape({
  contactPerson: string().required("Required"),
  shootDate: string().required("Required"),
});

export const SignInSchema = object().shape({
  countryCode: string().required("Required"),
  phone: string()
    .required("Phone number required")
    .matches(/^[0-9]+$/i, {
      message: "Expects phone number",
      excludeEmptyString: true,
    })
    .test("valid-phone", "Invalid phone number", (value) =>
      isValidPhoneNumber(value!, "KE")
    ),
});

export const VerifySignInSchema = object().shape({
  code: string()
    .required("Code is required")
    .matches(/^[0-9]+$/i, {
      message: "Expects digits only",
      excludeEmptyString: true,
    })
    .length(6, "Enter 6-digit code"),
});

export const UserOnboardingSchema = object().shape({
  avatar: string().required("Required"),
  firstName: string()
    .required("First name required")
    .matches(/^[a-zA-Z0-9 ]+$/i, {
      message: "First name should be alphabetic",
      excludeEmptyString: true,
    }),
  lastName: string()
    .required("Last name required")
    .matches(/^[a-zA-Z0-9 ]+$/i, {
      message: "First name should be alphabetic",
      excludeEmptyString: true,
    }),
});

export const MailingSchema = object().shape({
  email: string().required("Email required").email("Enter valid email"),
})

export const UnitSchema = object().shape({
  name: string().trim()
    .matches(/^[A-Z0-9a-z ]+$/i, {
      message: "Unit name should be alphanumeric",
      excludeEmptyString: true,
    }).required("Name is required"),
  baths: number().min(0, "Not valid"),
  price: number().min(1, "Not valid"),
  type: string().required("Required"),
})
