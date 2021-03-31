import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'
import { Store } from "@ngxs/store";
import { AddImage } from "projects/mfe-shared/src/lib/app-state/actions/image.action";
import { Image } from "projects/mfe-shared/src/lib/app-state/models/Image";

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements AfterViewInit {
  @ViewChild('draw') draw: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  constructor(private store: Store) { }

  ngAfterViewInit(): void {
    const canvas: HTMLCanvasElement = this.draw.nativeElement;
    this.ctx = canvas.getContext('2d');

    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#000';

    this.captureEvents(canvas);
  }

  save(): void {
    this.saveImage();
  }

  private loadImage = (image: string) => {
    // ToDo: Load Image
    var img = new Image();
    img.src = image;
    this.ctx.drawImage(img, 0, 0, this.draw.nativeElement.clientWidth, this.draw.nativeElement.clientHeight);
  }

  private saveImage = () => {
    // ToDo: Save
    const canvas: HTMLCanvasElement = this.draw.nativeElement;
    const image = canvas.toDataURL();
    this.store.dispatch(new AddImage({  content: image } as Image));
  }

  private captureEvents(canvas: HTMLCanvasElement) {
    fromEvent(canvas, 'mousedown')
      .pipe(
        switchMap(() => {
          return fromEvent(canvas, 'mousemove')
            .pipe(
              takeUntil(fromEvent(canvas, 'mouseup')),
              takeUntil(fromEvent(canvas, 'mouseleave')),
              pairwise()
            )
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvas.getBoundingClientRect();
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };
        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };
        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
    if (!this.ctx) { return; }
    this.ctx.beginPath();
    if (prevPos) {
      this.ctx.moveTo(prevPos.x, prevPos.y); // from
      this.ctx.lineTo(currentPos.x, currentPos.y);
      this.ctx.stroke();
    }
  }
}
