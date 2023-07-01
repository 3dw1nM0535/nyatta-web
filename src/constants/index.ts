import {
  type OnboardingStep,
  type DescriptionForm,
  type LocationForm,
  type CaretakerForm,
  type UnitsForm,
  type PriceForm,
  type AmenitiesForm,
  type PropertyTypeForm,
  type ContactPersonForm,
  type SignInForm,
} from "@types";

export const defaultSignInForm: SignInForm = {
  phone: undefined,
  countryCode: undefined,
};

export const FormSteps: OnboardingStep[] = [
  "description",
  "type",
  "location",
  "caretaker",
  "units",
  "shoot",
  "submitted",
];

export const FormStepTitle: Record<OnboardingStep, string> = {
  description: "How can you name this property?",
  location: "Describe your property by locality.",
  caretaker:
    "Schedule a shoot with us for your property. This person will give our photoman access and guide him/her through the property.",
  units: "You've come this far! How best can you describe your units?",
  type: "How best can you define your property?",
  shoot: "Schedule a professional shoot.",
  submitted: "You're all set🎉!",
};

export const defaultDescriptionForm: DescriptionForm = {
  name: "",
  propertyType: undefined,
};

export const defaultLocationForm: LocationForm = {
  town: null,
  postalCode: "",
};

export const defaultPriceForm: PriceForm = {
  minPrice: 0,
  maxPrice: 0,
};

export const defaultCaretakerForm: CaretakerForm = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  idVerification: "",
  countryCode: "",
};

export const defaultUnitsForm: UnitsForm = {
  units: [
    { name: "", type: "", baths: 0, amenities: [], price: 0, bedrooms: [] },
  ],
};

export const defaultAmenitiesForm: AmenitiesForm = {
  amenities: [],
};

export const defaultPropertyType: PropertyTypeForm = {
  propertyType: undefined,
};

export const defaultContactPerson: ContactPersonForm = {
  contactPerson: undefined,
  shootDate: new Date(),
};

export const PrivateRoutes = ["/landlord/setup", "/onboarding/user", "/success"];
