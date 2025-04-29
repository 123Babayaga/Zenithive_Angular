import { Component, OnInit } from '@angular/core';
import { MediaItem, MediaService } from '../../services/media.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-image-list',
  standalone:true,
  imports: [CommonModule, RouterModule],
  templateUrl: './image-list.component.html',
  styleUrl: './image-list.component.scss'
})
export class ImageListComponent implements OnInit {
  mediaItems: MediaItem[] = [];
  
  constructor(private mediaService: MediaService) { }

  ngOnInit(): void {
    this.mediaService.getMediaItems().subscribe(items => {
      this.mediaItems = items.slice(0, 20);
    });
  }
}
