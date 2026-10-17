import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'duration' })
export class DurationPipe implements PipeTransform {
  transform(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min ${seconds % 60} s`;
  }
}
