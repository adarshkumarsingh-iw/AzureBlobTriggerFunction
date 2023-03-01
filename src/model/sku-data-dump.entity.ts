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
export class SkuDataDump extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column(DataType.STRING)
  joiningKey: string;

  @Column(DataType.STRING)
  retailer: string;

  @Column(DataType.STRING)
  category: string;

  @Column(DataType.STRING)
  subCategory: string;

  @Column(DataType.STRING)
  subSubCategory: string;

  @Column(DataType.STRING)
  brand: string;

  @Column(DataType.STRING)
  platform: string;

  @Column(DataType.STRING)
  flavour: string;

  @Column(DataType.STRING)
  anti: string;

  @Column(DataType.TEXT)
  productCategory: string;

  @Column(DataType.STRING)
  productBrand: string;

  @Column(DataType.TEXT)
  productName: string;

  @Column(DataType.STRING)
  sku: string;

  @Column(DataType.TEXT)
  upc: string;

  @Column(DataType.FLOAT)
  ratingProdPage: number;

  @Column(DataType.FLOAT)
  allReviewsCount: number;

  @Column(DataType.FLOAT)
  xRATXREV: number;

  @Column(DataType.FLOAT)
  noReviewsProdPage: number;

  @Column(DataType.TEXT)
  url: string;

  @Column(DataType.TEXT)
  productModelNumber: string;

  @Column(DataType.TEXT)
  productImageUrl: string;

  @Column(DataType.STRING)
  uniqId: string;

  @Column(DataType.STRING)
  skuProductId: string;

  @Column(DataType.FLOAT)
  productPrice: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @AllowNull
  @Column(DataType.DATE)
  deactivatedAt: Date;
}
