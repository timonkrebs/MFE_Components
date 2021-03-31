import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { Image } from "projects/mfe-shared/src/lib/app-state/models/Image";
import { ImageState } from "projects/mfe-shared/src/lib/app-state/state/image.state";
import { environment } from "../../../../../src/environments/environment";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  @Select(ImageState.getImages) users: Observable<Image[]>;
  remoteDrawUrl;
  loadComponent = false;

  constructor(private store: Store) {
    this.remoteDrawUrl = `${environment.remoteDraw}/remoteEntry.js`;
  }

  ngOnInit(): void {
  }
}
