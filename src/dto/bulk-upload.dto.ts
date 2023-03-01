import { IsString } from "class-validator";

export class BulkUploadDto {
  @IsString()
  location: string;
  @IsString()
  categoryId: string;
  @IsString()
  productId: string;
  @IsString()
  locationId: string;
  @IsString()
  startDate: string;
  @IsString()
  endDate: string;
  @IsString()
  type: string;
  @IsString()
  createdBy: string;
}
