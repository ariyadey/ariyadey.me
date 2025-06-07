import { inject, Pipe, PipeTransform } from "@angular/core";
import { UrlUtils } from "@main/shared/resource/url-utils";

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
  private readonly urlUtils = inject(UrlUtils);

  transform(path: string): string {
    return this.urlUtils.getImagePath(path);
  }
}
