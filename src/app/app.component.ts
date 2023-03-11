import { Component, Output } from '@angular/core';
import { GameStorageService } from './service/game-storage.service';
import { GameStatistics } from './model/game.model';
import { MasterMindService, OptionSelected, PasswordClues } from './service/mastermind.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


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
  score = 0;
  closeResult = '';

  open(content:any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  /**
   * Create an instance of AppComponent
   * 
   * @param storage 
   * @param masterMind 
   */
  constructor(storage: GameStorageService, masterMind: MasterMindService,
    private modalService: NgbModal) {

    this.storage = storage;
    this.masterMind = masterMind;
    this.statistics = this.storage.statistics;
    this.optionSelected = 'alpha';
    this.score = this.statistics?.won ? this.statistics.won : 0;
  }

  /**
   * Delete storage data such as: Player name
   */
  resetApp() {
    this.storage.removeStorage();
    this.statistics = null;
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
      won: 0
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
    if (this.masterMind.passwordClues[this.masterMind.attempt].selection.includes('alpha')
      || this.masterMind.gameState !== 'ip') {
      return;
    }

    this.masterMind.validate();

    if (this.masterMind.gameState !== 'ip') {
      if (this.masterMind.gameState === 'won') {
        this.score += 110 - (10 * this.masterMind.attempt);
      }
      this.masterMind.attempt = this.masterMind.maxAttempt;
      this.saveStatistics({ name: this.statistics?.name, won: this.score });
      this.showResult();
    }
  }

  async showResult() {
    alert(this.masterMind.gameState === 'won' ? 'Ganaste!!!' : 'Perdiste');
  }

  /**
   * Starts new game
   */
  onClickNewPassword() {
    if (confirm('¿Desea comenzar un nuevo juego?')) {
      this.masterMind.newGame();
    }
  }
}
