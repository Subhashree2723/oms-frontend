import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Resolves an image URL returned by the API. Absolute URLs (e.g. seeded
 * https://picsum.photos/... placeholders) pass through unchanged; relative
 * paths returned by the upload endpoints (e.g. /uploads/products/xxx.jpg)
 * get the backend origin prefixed so <img> tags load them correctly from
 * the Angular dev server on a different port.
 */
@Pipe({ name: 'imageUrl' })
export class ImageUrlPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return 'https://placehold.co/400x400?text=No+Image';
    }
    if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('data:')) {
      return value;
    }
    return `${environment.serverUrl}${value}`;
  }
}
