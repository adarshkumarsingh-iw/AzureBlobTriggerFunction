import { AzureFunction, Context } from "@azure/functions";
import * as fs from "fs";
import blobService from "../src/service/blob.service";

const blobTrigger: AzureFunction = async function (
  context: Context,
  myBlob: any
): Promise<void> {
  context.log(
    "Blob trigger function processed blob \n Name:",
    context.bindingData.name, // this is same as Queue name
    "\n Blob Size:",
    myBlob.length,
    "Bytes"
  );
  const filePath = `file/${context.bindingData.name}.parquet`;
  fs.writeFileSync(filePath, myBlob);
  blobService.dataProcessing(filePath, context.bindingData.name);
};

export default blobTrigger;
