import { Component } from '@angular/core';
import { GameStorageService } from './service/game-storage.service';
import { GameStatistics } from './model/game.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My master mind';
  storage: GameStorageService;
  statistics: GameStatistics | null;
  name: string = '';

  constructor(storage: GameStorageService) {
    this.storage = storage;
    this.statistics = this.storage.statistics;
  }

  saveStatistics(statistics: GameStatistics) {
    this.statistics = statistics;
    this.storage.saveStatistics(statistics);
  }

  onClickEnter() {
    this.saveStatistics({
      name: this.name.toUpperCase(),
      won: 0,
      lost: 0,
    });
    this.name = '';
  }
}
