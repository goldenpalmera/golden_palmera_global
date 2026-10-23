import { getFloatButtons } from "./getFloatButton";
import { FALLBACK_FLOATING_BUTTONS } from "./fallbacks";
import type { FloatingButtonsData } from "./types";

export async function getFloatButtonsData(): Promise<FloatingButtonsData> {
  const data = await getFloatButtons();

  return {
    ...FALLBACK_FLOATING_BUTTONS,
    ...data,

    whatsapp: {
      ...FALLBACK_FLOATING_BUTTONS.whatsapp,
      ...data?.whatsapp,
    },

    phoneCall: {
      ...FALLBACK_FLOATING_BUTTONS.phoneCall,
      ...data?.phoneCall,
    }
  };
}