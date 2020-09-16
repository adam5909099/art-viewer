export interface Painting {
  _id?: string;
  name: string;
  author: string;
  creationDate: Date;
  sizeWidth: number;
  sizeHeight: number;
  notes?: string;
  filePath?: string;
}
