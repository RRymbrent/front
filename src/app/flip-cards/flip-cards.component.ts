import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flip-cards',
  templateUrl: './flip-cards.component.html',
  styleUrls: ['./flip-cards.component.scss']
})
export class FlipCardsComponent {
  letters =   ['F', 'K', 'T', 'J', 'G', 'N', 'A', 'Z', 'D', 'C', 'Y', 'W', 'U', 'L', 'S', 'P', 'Q', 'B', 'E', 'H', 'X', 'V', 'R', 'O', 'M', 'I', ]

  constructor(private router: Router) {}

  backPage() {
    this.router.navigate(['/play']);
  }

  cards = [
    { question: "What is 'I love you' in Kapampangan?", answer: 'Kaluguran daka' },
    { question: "What is 'Good morning' in Kapampangan?", answer: 'Mayap a abak' },
    { question: "What is 'Thank you so much' in Kapampangan?", answer: 'Dakal a salamat' },
    { question: "What is 'How are you?' in Kapampangan?", answer: 'Komusta ka?' },
    { question: "What is 'Good evening' in Kapampangan?", answer: 'Mayap a bengi' },
    { question: "What is 'Yes' in Kapampangan?", answer: "Wa/Opu" },
    { question: "What is 'No' in Kapampangan?", answer: "Alî" },
    { question: "What is 'But' in Kapampangan?", answer: "Oneng/Pero" },
    { question: "What is 'Because' in Kapampangan?", answer: "Uli/Uling" },
    { question: "What is 'Distracted' in Kapampangan?", answer: "Mebaligo/Melibang" },
    { question: "What is 'Discuss' in Kapampangan?", answer: "Pisábyán" },
    { question: "What is 'Follow' in Kapampangan?", answer: "Tukyán/Túkián" },
    { question: "What is 'Sorry' in Kapampangan?", answer: "Pasensya na/Pasensya pu" },
    { question: "What is 'Borrow' in Kapampangan?", answer: "Manandám/Andamán" },
    { question: "What is 'Forgive' in Kapampangan?", answer: "Magpatawad/Patawaran" },
    { question: "What is 'Tell' in Kapampangan?", answer: "Sabyán" },
    { question: "What is 'Use' in Kapampangan?", answer: "Gamitan" },
    { question: "What is 'Help' in Kapampangan?", answer: "Saup/Sopan" },
    { question: "What is 'Talk' in Kapampangan?", answer: "Manyalita/Pakisabyán" },
    { question: "What is 'A lot/So much' in Kapampangan?", answer: "Dakal/Marakal" },
    { question: "What is 'Can' in Kapampangan?", answer: "Agyû" },
    { question: "What is 'True' in Kapampangan?", answer: "Tutu/Tune" },
    { question: "What is 'False' in Kapampangan?", answer: "E tutû/Ali tune" },
    { question: "What is 'Advice' in Kapampangan?", answer: "Payu" },
    { question: "What is 'Penalize' in Kapampangan?", answer: "Parusán/Mamarusa" },
    { question: "What is 'Work' in Kapampangan?", answer: "n. Obra v. pagobran" },
    { question: "What is 'Affection' in Kapampangan?", answer: "Lugúd" },
    { question: "What is 'Divide' in Kapampangan?", answer: "Pipitna-pitna, pitnán" },
    { question: "What is 'Involve' in Kapampangan?", answer: "Miyabe, iyabe" },
    { question: "What is 'Dear' in Kapampangan?", answer: "Kalugurán" },
    { question: "What is 'Arise' in Kapampangan?", answer: "(get up) tikdó, talakad, mibangun" },
    { question: "What is 'Ugly' in Kapampangan?", answer: "Matsura, manong" },
    { question: "What is 'First' in Kapampangan?", answer: "Mumuna, prumeru" },
    { question: "What is 'Ourselves' in Kapampangan?", answer: "Ikata or icami or itamu" },
    { question: "What is 'Us' in Kapampangan?", answer: "kekatamu/itamu, or kékami, ikami" },
    { question: "What is 'Buy' in Kapampangan?", answer: 'salì, saliwán' }
  ];
  flippedCards: boolean[] = new Array(this.cards.length).fill(false);
  currentPage = 0;
  itemsPerPage = 12; 
  totalPages = Math.ceil(this.cards.length / this.itemsPerPage);

  get paginatedCards() {
    const startIndex = this.currentPage * this.itemsPerPage;
    return this.cards.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
  unflipAll() {
    this.flippedCards.fill(false);
  }

  onCardClick(index: number) {
    const actualIndex = index + this.currentPage * this.itemsPerPage;
    this.flippedCards[actualIndex] = !this.flippedCards[actualIndex];
  }


}
