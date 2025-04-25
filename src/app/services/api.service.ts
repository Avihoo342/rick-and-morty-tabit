import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../models/character.model';
import { Episode } from '../models/episode.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly BASE_URL = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getCharacters(page: number, name?: string, status?: string): Observable<{ info: any; results: Character[] }> {
    let query = `${this.BASE_URL}/character?page=${page}`;
    if (name) query += `&name=${name}`;
    if (status) query += `&status=${status}`;
    return this.http.get<{ info: any; results: Character[] }>(query); // Adjusted type
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.BASE_URL}/character/${id}`);
  }

  getEpisodes(): Observable<Episode[]> {
    return this.http.get<Episode[]>(`${this.BASE_URL}/episode`);
  }
}