import { Youtuber } from '../types/youtubers.types';

export class YoutuberCard {
  private youtuber: Youtuber;
  private container: HTMLElement;
  private onVote: (id: number) => void;

  constructor(youtuber: Youtuber, containerId: string, onVote: (id: number) => void) {
    this.youtuber = youtuber;
    this.onVote = onVote;
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id ${containerId} not found`);
    }
    this.container = container;
  }

  public render(): void {
    const card = document.createElement('div');
    card.className = 'youtuber-card';
    
    const image = document.createElement('img');
    image.src = this.youtuber.image;
    image.alt = this.youtuber.name;
    image.className = 'youtuber-image';
    
    const name = document.createElement('h3');
    name.textContent = this.youtuber.name;
    
    const votes = document.createElement('p');
    votes.textContent = `Votos: ${this.youtuber.votes.toLocaleString()}`;
    
    const weight = document.createElement('p');
    weight.textContent = `Peso: ${this.youtuber.weight}`;
    
    const voteButton = document.createElement('button');
    voteButton.textContent = 'Votar';
    voteButton.addEventListener('click', () => this.onVote(this.youtuber.id));
    
    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(votes);
    card.appendChild(weight);
    card.appendChild(voteButton);
    
    this.container.appendChild(card);
  }

  public update(youtuber: Youtuber): void {
    this.youtuber = youtuber;
    this.container.innerHTML = '';
    this.render();
  }
} 