import { Pipe, PipeTransform } from "@angular/core";

/**
 * @description
 * The `ImgResolvePipe` is an Angular pipe that resolves image paths.
 * It simplifies referencing images
 * in templates by ensuring a consistent base path.
 *
 * @example
 * <img [src]="'example.png'" | imgResolve" alt="Example Image">
 *
 * @author Ariya Moheb
 */
@Pipe({
  name: "imgResolve",
})
export class ImgResolvePipe implements PipeTransform {
  transform(path: string): string {
    return `img/${path}`;
  }
}
