import { DocumentObjectIdTransformer } from '../transformers/document-object-id.tranformer';

export class BaseDocumentEntity {
  @DocumentObjectIdTransformer()
  public _id: string;
}
