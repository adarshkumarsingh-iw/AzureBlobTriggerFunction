import { AzureFunction, Context } from "@azure/functions";
import * as fs from "fs";
import blobService from "../src/service/blob.service";

const blobTrigger: AzureFunction = async function (
  context: Context,
  myBlob: any
): Promise<void> {
  try {
    const filePath = `file/${context.bindingData.name}.parquet`;
    fs.writeFileSync(filePath, myBlob);
    await blobService.dataProcessing(filePath, context.bindingData.name);
    context.log(
      `Processed blob ${context.bindingData.blobTrigger} with result: Completed`
    );

    context.res = {
      status: 200,
      body: {
        message: `Processed blob ${context.bindingData.blobTrigger} with result: Completed`,
      },
    };
  } catch (error) {
    context.log.error(error);
    context.res = {
      status: 500,
      body: {
        message: `Error processing blob ${context.bindingData.blobTrigger}: ${error}`,
      },
    };
  }
};

export default blobTrigger;
