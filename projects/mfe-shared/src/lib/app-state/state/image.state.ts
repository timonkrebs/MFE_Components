import { State, Action, StateContext, Selector } from "@ngxs/store";
import { Image } from "../models/Image";
import { AddImage, RemoveImage } from "../actions/image.action";
import { Injectable } from "@angular/core";

export class ImageStateModel {
  images: Image[];
}

/**
 * The ImageState
 */
@State<ImageStateModel>({
  name: "images",
  defaults: {
    images: [],
  },
})
@Injectable()
export class ImageState {
  /**
   * Selector to get images from the application state
   * @param state: the application state
   */
  @Selector()
  static getImages(state: ImageStateModel): Image[] {
    return state.images;
  }

  /**
   * Add an image to the application state
   *
   * @param param0: state context
   * @param param1: playload of AddImage action
   */
  @Action(AddImage)
  add(
    { getState, patchState, setState }: StateContext<ImageStateModel>,
    { payload }: AddImage
  ): void {
    console.log(payload)
    const state = getState();
    if (state && state.images) {
      patchState({
        images: [...state.images, payload],
      });
    } else {
      setState({
        images: [payload],
      });
    }
  }

  /**
   * Remove an image from the application state
   *
   * @param param0: state context
   * @param param1: playload of AddImage action
   */
  @Action(RemoveImage)
  remove(
    { getState, setState }: StateContext<ImageStateModel>,
    { payload }: AddImage
  ): void {
    const state = getState();
    if (state && state.images) {
      setState({
        images: state.images.filter(
          (i) => !(i.content === payload.content)
        ),
      });
    }
  }
}
