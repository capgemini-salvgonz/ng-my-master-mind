import { Component, Output } from '@angular/core';
import { GameStorageService } from './service/game-storage.service';
import { GameStatistics } from './model/game.model';
import { MasterMindService, OptionSelected, PasswordClues } from './service/mastermind.service';



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
  optionSelected: OptionSelected;


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

  /**
   * Start the game after a name was given
   */
  onClickEnter() {
    this.saveStatistics({
      name: this.name.toUpperCase(),
      won: 0,
      lost: 0,
    });
    this.name = '';
  }

  /**
   * 
   * @param option color selected
   */
  onClickOption(option: OptionSelected): void {
    this.optionSelected = option;
  }

  /**
   * 
   * @param index row selected
   * @param position 1 to 5 position
   * @returns 
   */
  onClickAnswer(index: number, position: number) {
    if (this.optionSelected === 'alpha' || this.masterMind.attempt !== index) {
      return;
    }
    this.masterMind.setAnswer(position, this.optionSelected);
  }


  /**
   * Validate password
   */
  onClickCheckPassword() {
    if(this.masterMind.passwordClues[this.masterMind.attempt].selection.includes('alpha')
    || this.masterMind.gameState !== 'ip'){
      return;
    }

    this.masterMind.validate();

    if(this.masterMind.gameState !== 'ip'){
      this.masterMind.attempt = 10;
      this.masterMind.gameState === 'won' ? this.storage.addOneWon() : this.storage.addOneLost();      
      alert(this.masterMind.gameState === 'won' ? 'Ganaster!!!': 'Perdiste');
      this.statistics = this.storage.statistics;
    }
  }


  /**
   * Starts new game
   */
  onClickNewPassword() {
    if(confirm('¿Desea comenzar un nuevo juego?')){
      this.masterMind.newGame();
    }
  }
}
