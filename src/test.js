// const { ServiceBusClient } = require("@azure/service-bus");
// const fs = require("fs");
// var parquet = require("fast-parquet");
// const { BlobServiceClient } = require("@azure/storage-blob");
// const console = require("console");

// // connection string to your Service Bus namespace
// const connectionString =
//   "DefaultEndpointsProtocol=https;AccountName=igeniestorage;AccountKey=AmrjLdHsx4UPU9UItYcccGXnnho6E/yIyhYCav751Apjy5ZYY9JmtBAVhGO7LA0JxW28VFhTpHhv+AStQXGy1g==;EndpointSuffix=core.windows.net";

// // name of the queue
// // const queueName =
// //   "23a405d9-4873-40c3-af55-4a7bdfe06e80_d9c4c5b8-b05a-40b8-ad26-ddef11c801ba_12bea96f-f9cb-442d-9a57-922586451ade_2021-02-20_2022-05-20_SKUREVIEWS_30a89098-48da-405b-8b0f-f76314fb7216_1d4a8afd-665b-44f5-96bd-40b24c5c1db3-1677677342545";

// // const messages = [];

// async function main(filePath) {
//   // // create a Service Bus client using the connection string to the Service Bus namespace
//   // const sbClient = new ServiceBusClient(connectionString);

//   // // createSender() can also be used to create a sender for a topic.
//   // const sender = sbClient.createSender(queueName);

//   // try {
//   //   // Tries to send all messages in a single batch.
//   //   // Will fail if the messages cannot fit in a batch.
//   //   // await sender.sendMessages(messages);

//   //   // create a batch object
//   //   let batch = await sender.createMessageBatch();
//   //   for (let i = 0; i < messages.length; i++) {
//   //     // for each message in the array
//   //     const msg = {
//   //       body: {
//   //         rows: messages[i],
//   //         userProperties: JSON.stringify({
//   //           categoryId: "d9c4c5b8-b05a-40b8-ad26-ddef11c801ba",
//   //           productId: "12bea96f-f9cb-442d-9a57-922586451ade",
//   //           locationId: "23a405d9-4873-40c3-af55-4a7bdfe06e80",
//   //           createdBy: "30a89098-48da-405b-8b0f-f76314fb7216",
//   //           startDate: "2021-02-20",
//   //           endDate: "2022-05-20",
//   //           type: "SKUREVIEWS",
//   //           dataProcessingId: "1d4a8afd-665b-44f5-96bd-40b24c5c1db3",
//   //           isLastBatch:
//   //             messages[i][1].joiningKey == "730aa8c58a6c607c3f269e39d4fde786"
//   //               ? true
//   //               : false,
//   //         }),
//   //       },
//   //     };

//   //     // try to add the message to the batch
//   //     if (!batch.tryAddMessage(msg)) {
//   //       // if it fails to add the message to the current batch
//   //       // send the current batch as it is full

//   //       await sender.sendMessages(batch);

//   //       // then, create a new batch
//   //       batch = await sender.createMessageBatch();

//   //       // now, add the message failed to be added to the previous batch to this batch
//   //       if (!batch.tryAddMessage(msg)) {
//   //         // if it still can't be added to the batch, the message is probably too big to fit in a batch
//   //         throw new Error("Message too big to fit in a batch");
//   //       }
//   //     }
//   //   }

//   //   // Send the last created batch of messages to the queue
//   //   await sender.sendMessages(batch);

//   //   console.log(`Sent a batch of messages to the queue: ${queueName}`);

//   //   // Close the sender
//   //   await sender.close();
//   // } finally {
//   //   await sbClient.close();
//   // }

//   //   const fp = `file/test.parquet`;
//   //   fs.writeFileSync(fp, "file/review_v1.parquet");

//   // const reader = await parquet.ParquetReader.openFile(filePath);

//   // const cursor = reader.getCursor();

//   // const records = [];
//   // let record = null;

//   // while ((record = await cursor.next())) {
//   //   records.push(record);
//   // }

//   // console.log(records);
//   //   await reader.close();

//   const blobServiceClient =
//     BlobServiceClient.fromConnectionString(connectionString);

//   const containerClient = blobServiceClient.getContainerClient("igeni");

//   const blobClient = containerClient.getBlobClient(
//     "6433e2cd-5c88-4edb-aea8-3463d8580f7c_b0a3e58f-2f3e-4f80-8ec3-883285e93f5f_4a89753e-5290-4cca-b1d1-71c81b5affa6_2021-02-20_2022-05-20_REVIEWS_dff139a2-35d2-49a9-bcee-a85898f709de_e6e8cb7f-1dad-421b-8554-afc5fae8a8a5-1678763320744"
//   );

//   const buffer = await blobClient.downloadToBuffer();

//   //   console.log(buffer);

//   //   fs.writeFileSync("file/test.parquet", buffer);

//   //   console.log(buffer);

//   //   const buffer = fs.readFileSync("file/test.parquet");

//   const reader = await parquet.ParquetReader.openBuffer(buffer);

//   const cursor = reader.getCursor();

//   const records = [];
//   let record = null;

//   while ((record = await cursor.next())) {
//     records.push(record);
//   }

//   console.log(records);
// }

// // call the main function
// main("file/test.parquet").catch((err) => {
//   console.log("Error occurred: ", err);
//   process.exit(1);
// });
