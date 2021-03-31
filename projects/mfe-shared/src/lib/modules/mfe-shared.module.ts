import { NgModule } from "@angular/core";
import { MfeSharedComponent } from "../components/mfe-shared.component";
import { CommonModule } from "@angular/common";

@NgModule({
  // declarations: [MfeSharedComponent, ListImageComponent],
  declarations: [MfeSharedComponent],
  imports: [CommonModule],
  // exports: [MfeSharedComponent, ListImageComponent]
  exports: [MfeSharedComponent],
})
export class MfeSharedModule {}
