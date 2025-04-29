import { Component, OnInit } from '@angular/core';
import { MediaItem, MediaService } from '../../services/media.service';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-virtual-scroll-list',
  standalone:true,
  imports: [CommonModule, ScrollingModule ],
  templateUrl: './virtual-scroll-list.component.html',
  styleUrl: './virtual-scroll-list.component.scss'
})
export class VirtualScrollListComponent implements OnInit {
  mediaItems: MediaItem[] = [];
  
  constructor(private mediaService: MediaService) { }

  ngOnInit(): void {
    this.mediaService.getMediaItems().subscribe(items => {
      this.mediaItems = items;
    });
  }
}
