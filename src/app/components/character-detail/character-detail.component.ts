import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Character } from '../../models/character.model';
import { Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
import { STATUS_MESSAGES } from '../../consts';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterDetailComponent implements OnInit {
  character$!: Observable<Character>;

  public STATUS_MESSAGES = STATUS_MESSAGES;

  constructor(private route: ActivatedRoute, private apiService: ApiService,
    private location: Location ) {}

  ngOnInit(): void {
    this.character$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          return this.apiService.getCharacterById(Number(id));
        } else {
          return [];
        }
      })
    );
  }
  goBack(){
    this.location.back();
  }
}