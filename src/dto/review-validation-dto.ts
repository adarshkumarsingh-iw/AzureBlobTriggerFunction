export class ReviweSchemaDto {
  constructor() {
    this.JoiningKey = "";
    this.ReviewId = "";
    this.ReviewRating = 0;
    this.ReviewTimestamp = new Date();
    this.ReviewTitle = "";
    this.ReviewBody = "";
    this.ReviewTimestampYM = 0;
    this.Sentiment = 0;
    this.Theme = "";
    this.Topic = "";
    this.Sentencescore = 0;
    this.Analysis12MM = "";
    this.Analysis6MM = "";
    this.Analysis3MM = "";
    this.Analysis1MM = "";
    this.locationId = "";
    this.productId = "";
    this.categoryId = "";
    this.createdBy = "";
  }

  JoiningKey: string;

  ReviewId: string;

  ReviewRating: number;

  ReviewTimestamp: Date;

  ReviewTitle: string;

  ReviewBody: string;

  ReviewTimestampYM: number;

  Sentiment: number;

  Theme: string;

  Topic: string;

  Sentencescore: number;

  Analysis12MM: string;

  Analysis6MM: string;

  Analysis3MM: string;

  Analysis1MM: string;

  createdBy: string;

  productId: string;

  locationId: string;

  categoryId: string;
}
