import { Youtuber } from '../types/youtubers.types';
import { YoutuberCard } from './YoutuberCard';
import { VotingStatistics } from './VotingStatistics';

export class YoutubersContainer {
  private youtubers: Youtuber[];
  private container: HTMLElement;
  private cards: YoutuberCard[];
  private statistics: VotingStatistics;

  constructor(initialYoutubers: Youtuber[], containerId: string) {
    this.youtubers = initialYoutubers;
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id ${containerId} not found`);
    }
    this.container = container;
    this.cards = [];
    this.statistics = new VotingStatistics(this.youtubers, 'statistics-container');
  }

  private handleVote(id: number): void {
    this.youtubers = this.youtubers.map(youtuber =>
      youtuber.id === id
        ? { ...youtuber, votes: youtuber.votes + 1 }
        : youtuber
    );
    this.update();
  }

  public render(): void {
    // Crear contenedor de estadísticas
    const statsContainer = document.createElement('div');
    statsContainer.id = 'statistics-container';
    this.container.appendChild(statsContainer);
    
    // Crear contenedor de tarjetas
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'youtubers-grid';
    this.container.appendChild(cardsContainer);

    // Renderizar estadísticas
    this.statistics.render();

    // Crear y renderizar tarjetas
    this.cards = this.youtubers.map(youtuber => {
      const card = new YoutuberCard(youtuber, 'youtubers-grid', (id) => this.handleVote(id));
      card.render();
      return card;
    });
  }

  public update(): void {
    // Actualizar estadísticas
    this.statistics.update(this.youtubers);

    // Actualizar cada tarjeta
    this.cards.forEach((card, index) => {
      card.update(this.youtubers[index]);
    });
  }
} 