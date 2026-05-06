import { useCallback } from "react";

type OCRResult = {
  total: number | null;
  category: string;
  rawText?: string;
};

const OCR_API_KEY = "helloworld"; // free test key, better to use your own key later

function extractTotalFromText(text: string): number | null {
  const lines = text.split("\n");

  const totalLine = lines.find((line) =>
    /total|sum|amount|balance/i.test(line)
  );

  const targetText = totalLine || text;

  const numbers = targetText.match(/\d+[,.]\d{2}/g);

  if (!numbers || numbers.length === 0) return null;

  const parsedNumbers = numbers.map((num) => parseFloat(num.replace(",", ".")));

  return Math.max(...parsedNumbers);
}

export function useOCR() {
  const extractFromImage = useCallback(
    async (photo: any): Promise<OCRResult> => {
      const formData = new FormData();

      formData.append("base64Image", `data:image/jpg;base64,${photo.base64}`);
      formData.append("language", "eng");
      formData.append("apikey", OCR_API_KEY);
      formData.append("isOverlayRequired", "false");

      const response = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      const rawText = data?.ParsedResults?.[0]?.ParsedText || "";

      const total = extractTotalFromText(rawText);

      return {
        total,
        category: "Other",
        rawText,
      };
    },
    []
  );

  return { extractFromImage };
}
