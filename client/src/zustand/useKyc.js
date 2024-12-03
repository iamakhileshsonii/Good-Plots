import { create } from "zustand";

const useKyc = create((set) => ({
  totalStep: 4,
  currentStep: 1,
  formData: {
    areaDetails: {},
    proximityDetails: {},
    propertyCharges: {},
    parkingAndSociety: {},
  },
  updateFormData: (section, data) =>
    set((state) => ({
      formData: { ...state.formData, [section]: data },
    })),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalStep),
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),
  submitKyc: () =>
    set((state) => {
      console.log("submitKyc", state.formData);
    }),
}));

export default useKyc;
