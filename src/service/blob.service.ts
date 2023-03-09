import blobRepository from "../repository/blob.repository";
class BlobService {
  async dataProcessing(filePath: string, fileName: string) {
    await blobRepository.dataProcessing(filePath, fileName);
  }
}

export default new BlobService();
