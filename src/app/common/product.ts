export class Product {
  constructor(
    public sku: string,
    public name: string,
    public description: string,
    public unitPRice: Number,
    public imageUrl: string,
    public active: boolean,
    public unitsInStock: string,
    public dateCreated: Date,
    public lastUpdated: string
  ) {}
}
