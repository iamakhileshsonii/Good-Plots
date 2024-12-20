import { create } from "zustand";

const useKyc = create((set) => ({
  totalStep: 6,
  currentStep: 1,
  kycData: {
    areaDetails: {},
    proximityDetails: {},
    propertyCharges: {},
    parkingAndSociety: {},
    amenities: {},
    propertyImages: {},
  },
  updateKycFormData: (section, data) =>
    set((state) => ({
      kycData: { ...state.kycData, [section]: data }, // Update the correct field
    })),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalStep),
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),
}));

export default useKyc;
