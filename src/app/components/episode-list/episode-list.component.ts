import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Episode } from '../../models/episode.model';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.css']
})
export class EpisodeListComponent implements OnInit {
  episodes: Episode[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getEpisodes().subscribe(data => {
      this.episodes = this.shuffleArray(data);
    });
  }

  shuffleArray(array: Episode[]): Episode[] {
    return array.sort(() => Math.random() - 0.5);
  }
}