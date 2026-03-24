import { useCallback } from "react";

type OCRResult = {
  total: number;
  category: string;
  rawText?: string;
};

export function useOCR() {
  const extractFromImage = useCallback(
    async (photo: any): Promise<OCRResult> => {
      console.log("Received photo for OCR", photo?.uri);
      return {
        total: 24.9,
        category: "Grocery",
        rawText: "TOTAL 24.90 EUR",
      };
    },
    []
  );

  return { extractFromImage };
}
