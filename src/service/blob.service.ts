import blobRepository from "../repository/blob.repository";
class BlobService {
  async dataProcessing(filePath: string, fileName: string) {
    return blobRepository.dataProcessing(filePath, fileName);
  }
}

export default new BlobService();
