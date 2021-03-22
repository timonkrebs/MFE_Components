import { NgModule } from "@angular/core";
import { MfeSharedComponent } from "../components/mfe-shared.component";
import { CommonModule } from "@angular/common";

@NgModule({
  // declarations: [MfeSharedComponent, ListUserComponent],
  declarations: [MfeSharedComponent],
  imports: [CommonModule],
  // exports: [MfeSharedComponent, ListUserComponent]
  exports: [MfeSharedComponent],
})
export class MfeSharedModule {}
