import * as xlsx from "xlsx";
import { BLANKS } from "../constants/app-constants";
import { BulkUploadDto } from "../dto/bulk-upload.dto";
import { ReviweSchemaDto } from "../dto/review-validation-dto";

export const excelToJson = (filePath) => {
  const headers = 0;
  const workbook = xlsx.readFile(filePath);
  //   fs.unlinkSync(filePath);
  const ws = workbook.Sheets[workbook.SheetNames[0]];
  const rows: any = xlsx.utils.sheet_to_json(ws, {
    header: headers,
  });
  return rows;
};

export const getFileExtention = (filePath: string) => {
  return filePath.split(".").pop();
};

export const extractString = (str: string) => {
  const [
    locationId,
    categoryId,
    productId,
    startDate,
    endDate,
    type,
    createdBy,
    dataProcessingId,
  ] = str.split("_");
  const result = {
    locationId,
    categoryId,
    productId,
    startDate,
    endDate,
    type,
    createdBy,
    dataProcessingId: removeDateFromString(dataProcessingId),
  };
  return result as BulkUploadDto;
};

export const removeDateFromString = (input: string): string => {
  const regex = /-\d{13}$/g;
  return input.replace(regex, "");
};

export const validateReviewArray = (data: any) => {
  const result = [];
  for (const obj of data) {
    const validatedObj = {};
    for (const key in obj) {
      const newKey = key.trim().charAt(0).toLowerCase() + key.trim().slice(1);
      if (key in ReviweSchemaDto) {
        const value = obj[key];
        if (value !== undefined && value !== null && value !== "") {
          validatedObj[newKey] = value;
        } else {
          if (
            key == "ReviewRating" ||
            key == "ReviewTimestampYM" ||
            key == "Sentiment" ||
            key == "Sentencescore"
          ) {
            validatedObj[newKey] = 0;
          } else if (key == "ReviewTimestamp") {
            validatedObj[newKey] = null;
          } else {
            validatedObj[newKey] = BLANKS;
          }
        }
      }
    }

    result.push(validatedObj);
  }

  return result;
};
