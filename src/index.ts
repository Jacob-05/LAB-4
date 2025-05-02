import { YoutuberStore } from './flux/Store';
import { YoutuberActions } from './flux/Actions';
import { YoutubersContainer } from './components/YoutubersContainer';

// Cargar datos iniciales
fetch('/data/youtubers.json')
    .then(response => response.json())
    .then(data => {
        const store = YoutuberStore.getInstance();
        store.setYoutubers(data.youtubers);

        // Inicializar el contenedor principal
        const container = new YoutubersContainer(data.youtubers, 'app');
        container.render();

        // Suscribirse a cambios en el store
        store.addChangeListener(() => {
            container.update();
        });
    })
    .catch(error => console.error('Error cargando datos:', error));