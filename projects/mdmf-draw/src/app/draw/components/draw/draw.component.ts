import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements AfterViewInit {
  @ViewChild('draw') draw: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    const canvas: HTMLCanvasElement = this.draw.nativeElement;
    this.ctx = canvas.getContext('2d');

    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#000';

    this.captureEvents(canvas);
  }

  private loadImage = (image: string) => {
    // ToDo: Load Image
    var img = new Image();
    img.src = image;
    this.ctx.drawImage(img, 0, 0, this.draw.nativeElement.clientWidth, this.draw.nativeElement.clientHeight);
  }

  private save = () => {
    // ToDo: Save
    const canvas: HTMLCanvasElement = this.draw.nativeElement;
    const image = canvas.toDataURL();
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
