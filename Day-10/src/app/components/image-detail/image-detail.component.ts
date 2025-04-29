import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MediaItem, MediaService } from '../../services/media.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-detail',
  standalone:true,
  imports: [CommonModule,RouterModule],
  templateUrl: './image-detail.component.html',
  styleUrl: './image-detail.component.scss'
})
export class ImageDetailComponent implements OnInit {
  mediaItem?: MediaItem;
  
  constructor(
    private route: ActivatedRoute,
    private mediaService: MediaService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.mediaService.getMediaItem(id).subscribe(item => {
        this.mediaItem = item;
      });
    });
  }
}
