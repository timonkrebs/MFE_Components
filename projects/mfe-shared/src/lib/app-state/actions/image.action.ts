import { Image } from "../models/Image";

/**
 * Action to add an image
 */
export class AddImage {
  static readonly type = "[Image] Add";

  constructor(public payload: Image) {}
}

/**
 * Action to remove an image
 */
export class RemoveImage {
  static readonly type = "[Image] Remove";

  constructor(public payload: Image) {}
}
