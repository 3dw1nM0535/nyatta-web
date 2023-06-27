import { useState, type PropsWithChildren } from "react";

import { useQuery } from "@apollo/client";

import {
  defaultDescriptionForm,
  defaultLocationForm,
  defaultAmenitiesForm,
  defaultPriceForm,
  defaultUnitsForm,
  defaultCaretakerForm,
  defaultPropertyType,
  defaultContactPerson,
} from "@constants";
import { getTowns as GET_TOWNS } from "@gql";
import {
  type OnboardingStep,
  type DescriptionForm,
  type LocationForm,
  type CaretakerForm,
  type PriceForm,
  type UnitsForm,
  type AmenitiesForm,
  type PropertyTypeForm,
  type ContactPersonForm,
} from "@types";
import { OnboardingContext } from "contexts/property-onboarding";

export const OnboardingProvider = ({ children }: PropsWithChildren) => {
  const [descriptionForm, setDescriptionForm] = useState<DescriptionForm>(
    defaultDescriptionForm
  );
  const [amenitiesForm, setAmenitiesForm] =
    useState<AmenitiesForm>(defaultAmenitiesForm);
  const [locationForm, setLocationForm] =
    useState<LocationForm>(defaultLocationForm);
  const [priceForm, setPriceForm] = useState<PriceForm>(defaultPriceForm);
  const [caretakerForm, setCaretakerForm] =
    useState<CaretakerForm>(defaultCaretakerForm);
  const [caretakerVerified, setCaretakerVerified] = useState<boolean>(false);
  const [unitsForm, setUnitsForm] = useState<UnitsForm>(defaultUnitsForm);
  const [unitsCount, setUnitsCount] = useState<number>(1);
  const [propertyType, setPropertyType] =
    useState<PropertyTypeForm>(defaultPropertyType);
  const [contactPersonForm, setContactPersonForm] =
    useState<ContactPersonForm>(defaultContactPerson);
  // For default towns select input
  const { data } = useQuery(GET_TOWNS);
  const locations = data?.getTowns.map((item: any) => ({
    id: item.id,
    value: item.town.toLowerCase(),
    label: item.town,
    postalCode: item.postalCode,
  }));

  const [step, setStep] = useState<OnboardingStep>("shoot");

  return (
    <OnboardingContext.Provider
      value={{
        priceForm,
        setPriceForm,
        descriptionForm,
        setDescriptionForm,
        caretakerForm,
        setCaretakerForm,
        caretakerVerified,
        setCaretakerVerified,
        unitsForm,
        setUnitsForm,
        locationForm,
        setLocationForm,
        amenitiesForm,
        setAmenitiesForm,
        step,
        setStep,
        towns: locations,
        unitsCount,
        setUnitsCount,
        propertyType,
        setPropertyType,
        contactPersonForm,
        setContactPersonForm,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
