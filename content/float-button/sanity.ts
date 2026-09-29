import { FloatingButtonsData } from "./types";

export function floatMapper(
  data: FloatingButtonsData
): FloatingButtonsData {
  return {
    enabled: data?.enabled,
    whatsapp: data?.whatsapp,
    phoneCall: data?.phoneCall,
    toggleLabel: data?.toggleLabel,
    closeLabel: data?.closeLabel,
  };
}
