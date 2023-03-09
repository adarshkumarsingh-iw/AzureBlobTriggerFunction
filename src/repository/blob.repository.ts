var parquet = require("fast-parquet");

import { DATA_TYPES } from "../constants/app-constants";
import {
  extractString,
  validateReviewArray,
  validateSkuArray,
} from "../utils/helper";
import * as fs from "fs";
import { BulkUploadDto } from "../dto/bulk-upload.dto";
import { ServiceBusQueue } from "./azure-service-queue.repository";

class BlobRepository {
  db = {};
  constructor() {}

  async dataProcessing(filePath: string, fileName: string) {
    const dataInformation = extractString(fileName);

    switch (dataInformation.type) {
      case DATA_TYPES.SKU:
        {
          const generateRows: any[] = await this.convertParaqutToJson(
            filePath,
            dataInformation
          );
          const validatedRows = validateSkuArray(generateRows);
          await this.queueProcessing(validatedRows, dataInformation, fileName);
        }
        break;
      case DATA_TYPES.REVIEWS: {
        const generateRows: any[] = await this.convertParaqutToJson(
          filePath,
          dataInformation
        );
        const validatedRows = validateReviewArray(generateRows);
        await this.queueProcessing(validatedRows, dataInformation, fileName);
      }
      default:
        break;
    }

    try {
    } catch (error) {
      console.log(error);
    }
  }

  private async convertParaqutToJson(
    filePath: string,
    dataInformation: BulkUploadDto
  ): Promise<any[]> {
    try {
      const reader = await parquet.ParquetReader.openFile(filePath);

      const schema = reader.schema;

      // Exception Case
      const includedColumnIndexes = schema.fieldList
        .filter((field) => field.name !== "CrawlTimestamp")
        .map((field) => field.name);

      const cursor = reader.getCursor(includedColumnIndexes);

      const records: any[] = [];
      let item: any = null;

      while ((item = await cursor.next())) {
        records.push({
          ...item,
          createdBy: dataInformation.createdBy,
          productId: dataInformation.productId,
          locationId: dataInformation.locationId,
          categoryId: dataInformation.categoryId,
        });
      }

      await reader.close();
      await fs.promises.unlink(filePath);

      return records;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async queueProcessing(
    generatedObject: any[],
    dataInformation: BulkUploadDto,
    queueName: string
  ) {
    const queue = new ServiceBusQueue(
      "Endpoint=sb://igenieservicequeue.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=PLcJJZEyAjuRb/7ZhbDqboUloekVLru1H+ASbC/Kuvg=",
      queueName
    );
    try {
      const batches = this.batchProcessing(generatedObject, 255500);
      await queue.initialize();
      await queue.sendMessages(batches, dataInformation);
      await queue.close();
      console.log("******* Completed Sending The Message ********");
    } catch (error) {
      console.error(error);
      queue.close();
      throw error;
    }
  }

  batchProcessing(data: any, batchSize: number): any {
    const batches = [];
    let currentBatch = [];
    let currentBatchSize = 0;
    data.forEach((item) => {
      const itemSize = JSON.stringify(item).length;
      if (currentBatchSize + itemSize > batchSize) {
        batches.push(currentBatch);
        currentBatch = [];
        currentBatchSize = 0;
      }

      currentBatch.push(item);
      currentBatchSize += itemSize;
    });

    if (currentBatch.length > 0) {
      batches.push(currentBatch);
    }

    return batches;
  }
}

export default new BlobRepository();
