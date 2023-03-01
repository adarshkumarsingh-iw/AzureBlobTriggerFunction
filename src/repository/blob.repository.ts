var parquet = require("fast-parquet");
import { DATA_TYPES } from "../constants/app-constants";
import { extractString } from "../utils/helper";
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
          const generateRows: any[] = await this.convertParaqutToJson(filePath);
          await this.queueProcessing(generateRows, dataInformation, fileName);
        }
        break;
      case DATA_TYPES.SKU_REVIEWS: {
        const generateRows: any[] = await this.convertParaqutToJson(filePath);
        await this.queueProcessing(generateRows, dataInformation, fileName);
      }
      default:
        break;
    }

    try {
    } catch (error) {
      console.log(error);
    }
  }

  private async convertParaqutToJson(filePath: string): Promise<any[]> {
    const reader = await parquet.ParquetReader.openFile(filePath);
    const cursor = reader.getCursor();

    const records: any[] = [];
    let item: any = null;

    while ((item = await cursor.next())) {
      const formattedRecord = {};
      Object.entries(item).forEach(([key, value]) => {
        const formattedKey = key.trim();
        const formattedValue = typeof value === "string" ? value.trim() : value;
        formattedRecord[
          formattedKey.charAt(0).toLowerCase() + formattedKey.slice(1)
        ] = formattedValue;
      });
      records.push(formattedRecord);
    }

    await reader.close();
    await fs.promises.unlink(filePath);

    return records;
  }

  private async queueProcessing(
    generatedObject: any[],
    dataInformation: BulkUploadDto,
    queueName: string
  ) {
    const queue = new ServiceBusQueue(
      "Endpoint=sb://igeniequeue.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=k9eHVkQNU/7Er3k3QmedYIg1nY4RtiNH8+ASbB2Zd1Q=",
      queueName
    );
    try {
      const batchDataList: any[] = this.batchProcessing(generatedObject, 200);
      await queue.initialize();
      await queue.sendMessages(batchDataList, dataInformation);
    } catch (error) {
      console.error(error);
      queue.close();
      throw error;
    }
  }

  batchProcessing(data: any, batchSize: number) {
    const batches = [];
    for (let i = 0; i < data.length; i += batchSize) {
      batches.push(data.slice(i, i + batchSize));
    }
    return batches;
  }
}

export default new BlobRepository();
