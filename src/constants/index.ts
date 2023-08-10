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
  countryCode: "+254",
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
  description: "Property",
  location: "Location",
  caretaker:
    "Caretaker",
  units: "Units",
  type: "Property Type",
  shoot: "Shoot Date",
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
  countryCode: "+254",
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
  shootDate: "",
};

export const PrivateRoutes = ["/listings/setup", "/listings/overview", "/listings/units", "/listings", "/onboarding/user"];
