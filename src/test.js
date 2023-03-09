// const { ServiceBusClient } = require("@azure/service-bus");
// const fs = require("fs");
// var parquet = require("fast-parquet");

// // connection string to your Service Bus namespace
// const connectionString =
//   "Endpoint=sb://igeniequeue.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=k9eHVkQNU/7Er3k3QmedYIg1nY4RtiNH8+ASbB2Zd1Q=";

// // name of the queue
// const queueName =
//   "23a405d9-4873-40c3-af55-4a7bdfe06e80_d9c4c5b8-b05a-40b8-ad26-ddef11c801ba_12bea96f-f9cb-442d-9a57-922586451ade_2021-02-20_2022-05-20_SKUREVIEWS_30a89098-48da-405b-8b0f-f76314fb7216_1d4a8afd-665b-44f5-96bd-40b24c5c1db3-1677677342545";

// const messages = [];

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
//   const reader = await parquet.ParquetReader.openFile(filePath);

//   console.log(reader.envelopeReader);

//   // const includedColumnIndexes = schema.fieldList
//   //   .filter((field) => field.name !== "CrawlTimestamp")
//   //   .map((field) => field.name);

//   // const cursor = reader.getCursor(includedColumnIndexes);

//   // const records = [];
//   // let record = null;

//   // while ((record = await cursor.next())) {
//   //   records.push(record);
//   // }

//   // console.log(records);
//   await reader.close();
// }

// // call the main function
// main(
//   "/Users/impulsiveweb/Desktop/BlobTriggerServerlessApp/file/sku_v1.parquet"
// ).catch((err) => {
//   console.log("Error occurred: ", err);
//   process.exit(1);
// });
