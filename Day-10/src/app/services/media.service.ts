import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface MediaItem {
  id: number;
  title: string;
  imageUrl: string;
  thumbnailUrl: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private mediaItems: MediaItem[] = [];

  constructor() {
    for (let i = 1; i <= 1000; i++) {
      this.mediaItems.push({
        id: i,
        title: `Image ${i}`,
        imageUrl: `https://picsum.photos/id/${i + 100}/800/600`,
        thumbnailUrl: `https://picsum.photos/id/${i + 100}/200/150`,
        description: `Description for image ${i}`
      });
    }
  }

  getMediaItems(): Observable<MediaItem[]> {
    return of(this.mediaItems);
  }

  getMediaItem(id: number): Observable<MediaItem | undefined> {
    return of(this.mediaItems.find(item => item.id === id));
  }
}