import { Component, Directive, Input, Output } from '@angular/core';
import { GameStorageService } from './service/game-storage.service';
import { GameStatistics } from './model/game.model';
import { MasterMindService, OptionSelected } from './service/mastermind.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'My master mind';
  storage: GameStorageService;
  masterMind: MasterMindService;
  statistics: GameStatistics | null;
  name: string = '';
  @Output() optionSelected: OptionSelected;

  constructor(storage: GameStorageService, masterMind: MasterMindService) {
    this.storage = storage;
    this.masterMind = masterMind;
    this.statistics = this.storage.statistics;
    this.optionSelected = 'alpha';
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

  onClickOption(option: OptionSelected): void {
    this.optionSelected = option;
    console.log(this.masterMind);
  }

  onClickAnswer(position: number) {
    if(this.optionSelected === 'alpha'){
      return;
    }    
    this.masterMind.setAnswer(position, this.optionSelected);
  }
  
}
