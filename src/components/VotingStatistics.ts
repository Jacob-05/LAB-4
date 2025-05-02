import { Youtuber } from '../types/youtubers.types';

export class VotingStatistics {
  private youtubers: Youtuber[];
  private container: HTMLElement;

  constructor(youtubers: Youtuber[], containerId: string) {
    this.youtubers = youtubers;
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id ${containerId} not found`);
    }
    this.container = container;
  }

  private calculateTotalVotes(): number {
    return this.youtubers.reduce((sum, youtuber) => sum + youtuber.votes, 0);
  }

  private calculateAverageWeight(): number {
    const totalWeight = this.youtubers.reduce((sum, youtuber) => sum + youtuber.weight, 0);
    return totalWeight / this.youtubers.length;
  }

  public render(): void {
    const totalVotes = this.calculateTotalVotes();
    const averageWeight = this.calculateAverageWeight();

    const html = `
      <div class="voting-statistics">
        <h2>Estadísticas de Votación</h2>
        <div class="stats-container">
          <div class="stat-item">
            <h3>Total de Votos</h3>
            <p>${totalVotes.toLocaleString()}</p>
          </div>
          <div class="stat-item">
            <h3>Promedio de Peso</h3>
            <p>${averageWeight.toFixed(2)}</p>
          </div>
          <div class="stat-item">
            <h3>Número de Youtubers</h3>
            <p>${this.youtubers.length}</p>
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }

  public update(youtubers: Youtuber[]): void {
    this.youtubers = youtubers;
    this.render();
  }
} 