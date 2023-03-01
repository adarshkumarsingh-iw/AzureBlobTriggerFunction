import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  AllowNull,
} from "sequelize-typescript";

@Table
export class SkuReviewsDataDump extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column(DataType.STRING)
  joiningKey: string;

  @Column(DataType.STRING)
  reviewId: string;

  @Column(DataType.INTEGER)
  reviewRating: number;

  @Column(DataType.DATE)
  reviewTimestamp: Date;

  @Column(DataType.TEXT)
  reviewTitle: string;

  @Column(DataType.TEXT)
  reviewBody: string;

  @Column(DataType.STRING)
  topic: string;

  @Column(DataType.STRING)
  theme: string;

  @Column(DataType.FLOAT)
  sentencescore: number;

  @Column(DataType.FLOAT)
  sentiment: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @AllowNull
  @Column(DataType.DATE)
  deactivatedAt: Date;
}
