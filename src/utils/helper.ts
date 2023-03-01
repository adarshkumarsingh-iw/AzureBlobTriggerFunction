import * as xlsx from "xlsx";
import { BulkUploadDto } from "../dto/bulk-upload.dto";

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
  const [location, categoryId, productId, startDate, endDate, type, createdBy] =
    str.split("_");
  const result = {
    location,
    categoryId,
    productId,
    startDate,
    endDate,
    type,
    createdBy,
  };
  return result as BulkUploadDto;
};
