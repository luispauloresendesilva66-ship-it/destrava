# Reels da Destrava

Reels verticais (1080×1920, 30 fps) para Instagram/TikTok, gerados por um template único do Remotion
(composição `Reel`, código em `video/src/reels/`). Cada Reel é só dados: `promo/reel-NN/roteiro.json` + a voz de cada cena.

```
promo/reel-NN/
  roteiro.json        # roteiro (versionado)
  roteiro.md          # opcional, contexto
  audio/cena01.mp3 …  # voz final, uma por cena (git-ignorado)
  out/reel-NN.mp4     # vídeo final (git-ignorado)
  out/stills/         # quadros para revisão + contato.png (git-ignorado)
```

## Criar um Reel novo

1. **Copie um roteiro** parecido: `cp -r promo/reel-02 promo/reel-16` (apague `audio/` e `out/`) e edite `promo/reel-16/roteiro.json`:

   ```json
   {
     "id": "reel-16",
     "titulo": "Título interno",
     "tipo": "dica",
     "cenas": [
       { "fala": "Texto falado na cena.", "titulo": "Título com uma *palavra* em itálico", "visual": { "tipo": "code-typing", "codigo": "<p>Oi</p>", "destaque": [1] } },
       { "fala": "Destrava sua carreira. Um nível de cada vez. Comece grátis hoje.", "titulo": "Um nível de cada *vez*", "visual": { "tipo": "end-card" } }
     ]
   }
   ```

   - `tipo` do Reel define a etiqueta do topo: `pitch`, `dica`, `mito`, `desafio`, `produto`.
   - `titulo` de cada cena: curto (até ~28 caracteres), uma palavra entre `*` vira itálico em degradê.
   - Visuais disponíveis (`visual.tipo`): `price-tags` (`tags`), `logo-unlock` (`itens` opcional), `phone-lesson`,
     `phone-exercise` (`pergunta`, `opcoes`, `correta` 0-based), `exam-progress` (`percent`), `level-steps`, `certificate-qr`,
     `plan-cards`, `badges` (`itens`; itens de até 4 letras viram teclas, ex. `["Ctrl","+","U"]`),
     `code-typing` (`codigo`, `destaque` = linhas 1-based), `browser-preview` (`html`), `code-and-preview` (`codigo`),
     `quiz` (`pergunta`, `opcoes`, `correta`), `myth-fact` (`mito`, `verdade`), `checklist` (`itens`), `end-card`.
   - Desafio: repita o mesmo `quiz` em duas cenas seguidas. A primeira mostra pergunta + opções com o cronômetro; a segunda
     continua sem transição, mostra 3‑2‑1 quando a fala diz "três, dois, um" e revela a certa em verde no fim.
   - Só nomes fictícios (ex. "Ana Souza") e domínios de exemplo (`ana.exemplo.com`); nenhuma marca, empresa ou pessoa real.

2. **Gere a voz** de cada cena (uma fala por arquivo). Salve a `fala` da cena em `fala.txt` e rode, dentro de `promo/reel-16/audio/`:

   ```
   C:/rmt/tts-venv/Scripts/edge-tts --voice pt-BR-ThalitaMultilingualNeural --pitch=-25Hz -f fala.txt --write-media cena01.mp3
   ```

   Repita para `cena02.mp3`, `cena03.mp3`… Se der `NoAudioReceived`, é instabilidade do serviço: rode o mesmo comando de novo.

3. **Revise os quadros** (em `video/`):

   ```
   export REMOTION_BROWSER="C:/rmt/chrome/chrome-headless-shell.exe"   # Chrome em caminho curto (Windows)
   npm run still:reel -- reel-16
   ```

   Gera `promo/reel-16/out/stills/` (quadro 0 + início, 85% e fim de cada cena) e `contato.png` com todos lado a lado.
   Confira cortes, sobreposições e as zonas seguras (nada importante nos 220 px de cima, 380 px de baixo e 60 px das laterais).

4. **Renderize**:

   ```
   npm run render:reel -- reel-16     # um Reel  -> promo/reel-16/out/reel-16.mp4
   npm run render:reels               # todos, um depois do outro
   npx remotion ffprobe ../promo/reel-16/out/reel-16.mp4   # confere vídeo + áudio e duração
   ```

   Saída: H.264 (crf 23), AAC 160k, yuv420p. Também dá para passar `--browser-executable=C:/rmt/chrome/chrome-headless-shell.exe`
   em vez da variável `REMOTION_BROWSER`.

## Como funciona

- `video/scripts/prep-reel.mjs` copia `roteiro.json` e os áudios para `video/public/reels/<id>/`, mede cada áudio (ffprobe)
  e estima o tempo de cada palavra: as pausas reais da voz (silencedetect) são casadas com a pontuação da fala. Isso alimenta
  as legendas karaokê (2–4 palavras por vez) e a sincronia dos visuais com a fala. Roda sozinho antes de `still`/`render`
  (ou `npm run prep:reels`, também chamado pelo `npm run studio`).
- Duração de cada cena = áudio + 0,25 s. Cena sem áudio: duração estimada pelo número de palavras, sem som.
- No Studio (`npm run studio`), abra a composição `Reel` e troque a prop `id` para ver outro Reel.
- Sem música de fundo (não há trilha licenciada).
