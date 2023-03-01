import { ServiceBusClient, ServiceBusSender } from "@azure/service-bus";

export class ServiceBusQueue {
  connectionString: string;
  queueName: string;
  sbClient: ServiceBusClient;
  sender: ServiceBusSender;

  constructor(connectionString, queueName) {
    this.connectionString = connectionString;
    this.queueName = queueName;
    this.sbClient = null;
    this.sender = null;
  }

  async initialize() {
    this.sbClient = new ServiceBusClient(this.connectionString);
    this.sender = this.sbClient.createSender(this.queueName);
  }

  async sendMessages(listOfMessage: any, dataInformation: any) {
    let batch = await this.sender.createMessageBatch();

    for (let i = 0; i < listOfMessage.length; i++) {
      const message = {
        body: {
          data: listOfMessage[i],
          userProperties: JSON.stringify(dataInformation),
        },
      };
      if (!batch.tryAddMessage(message)) {
        await this.sender.sendMessages(batch);
        batch = await this.sender.createMessageBatch();

        if (!batch.tryAddMessage(message)) {
          throw new Error("Message too big to fit in a batch");
        }
      }
    }

    await this.sender.sendMessages(batch);
  }

  async close() {
    await this.sender.close();
    await this.sbClient.close();
  }
}
