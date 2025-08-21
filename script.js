// Dados das rádios Spotify
const radiosSpotify = {
  titulo: "RADIOS COMPARTILHADAS!",
  radios: [
    {
      nome: "AC/DC",
      src: "https://open.spotify.com/embed/playlist/37i9dQZF1E4sEEhVjuqbvL?utm_source=generator"
    },
    {
      nome: "STONE TEMPLE PILOTS",
      src: "https://open.spotify.com/embed/playlist/37i9dQZF1E4tOykeUuFlZm?utm_source=generator"
    },
    {
      nome: "AUDIOSLAVE",
      src: "https://open.spotify.com/embed/playlist/37i9dQZF1E4krzwreZaRxr?utm_source=generator"
    }
  ]
};

// Dados das rádios abertas
const radiosAbertas = {
  titulo: "RÁDIOS ABERTAS GRATUITAS!",
  radios: [
    {
      nome: "Rádio Eldorado",
      src: "https://stream.zeno.fm/0r0xa792kwzuv"
    },
    {
      nome: "Rádio Metal",
      src: "https://stream.zeno.fm/0r0xa792kwzuv"
    },
    {
      nome: "Rádio Jazz",
      src: "https://stream.zeno.fm/0r0xa792kwzuv"
    }
  ]
};

function trocarRadios(tipo) {
    const conteudoDiv = document.getElementById('conteudo-radios');
    const links = document.querySelectorAll('.header-menu__sobre a');
    
    // Remove a classe active de todos os links
    links.forEach(link => link.classList.remove('header-menu__sobre--active'));
    
    // Adiciona a classe active ao link clicado
    event.target.classList.add('header-menu__sobre--active');
    
    let dadosRadios;
    dadosRadios = tipo === 'spotify' ? radiosSpotify : radiosAbertas;
    
    // Gera o HTML das rádios
    let html = `<h2 class="cards-plano__title">${dadosRadios.titulo}</h2>`;
    
    dadosRadios.radios.forEach(radio => {
      if (tipo === 'spotify') {
        // Para rádios Spotify, usa iframe
        html += `
          <h2>${radio.nome}</h2>
          <iframe 
            data-testid="embed-iframe" 
            style="border-radius:12px; align-self: center;" 
            src="${radio.src}" 
            width="90%"
            height="152" 
            frameBorder="0" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy">
          </iframe>
        `;
      } else {
        // Para rádios abertas, usa player de áudio
        html += `
          <div class="radio-card">
            <h2>${radio.nome}</h2>
            <audio controls style="width: 90%; margin: 10px 0;" preload="none">
              <source src="${radio.src}" type="audio/mpeg">
              <source src="${radio.src}" type="audio/aac">
              <source src="${radio.src}" type="audio/ogg">
              Seu navegador não suporta o elemento de áudio.
            </audio>
            <div class="radio-status" style="text-align: center; margin-top: 5px; font-size: 0.8rem; color: #ccc;">
                Clique em play para carregar a rádio
            </div>
          </div>
        `;
      }
    });
    
    conteudoDiv.innerHTML = html;

  // Adiciona event listeners para os players de áudio
    if (tipo === 'abertas') {
      const audioElements = conteudoDiv.querySelectorAll('audio');

      audioElements.forEach((audio, index) => {
        const statusDiv = audio.parentElement.querySelector('.radio-status');
        
        audio.addEventListener('loadstart', () => {
            statusDiv.textContent = 'Carregando...';
            statusDiv.style.color = '#ffa500';
        });
        
        audio.addEventListener('canplay', () => {
            statusDiv.textContent = 'Pronto para tocar';
            statusDiv.style.color = '#4CAF50';
        });
        
        audio.addEventListener('error', () => {
            statusDiv.textContent = 'Erro ao carregar - Tente novamente';
            statusDiv.style.color = '#f44336';
        });
        
        audio.addEventListener('play', () => {
            statusDiv.textContent = 'Tocando agora';
            statusDiv.style.color = '#4CAF50';
        });
        
        audio.addEventListener('pause', () => {
            statusDiv.textContent = 'Pausado';
            statusDiv.style.color = '#ccc';
        });
      });
    }
  }

// Carrega as rádios Spotify por padrão
window.onload = function() {
    trocarRadios('spotify');
};
