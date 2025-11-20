export interface Problem {
  question: string;
  answer: number;
  wrong: number[];
}

export function getGameTemplate(
  subject: string,
  topic: string,
  gradeLevel: string,
  problems: Problem[],
  difficulty: string
): string {
  // Adjust physics based on difficulty
  const difficultySettings = {
    easy: { gravity: 500, jumpPower: -400, moveSpeed: 200 },
    medium: { gravity: 600, jumpPower: -450, moveSpeed: 250 },
    hard: { gravity: 700, jumpPower: -500, moveSpeed: 300 }
  };

  const settings = difficultySettings[difficulty.toLowerCase() as keyof typeof difficultySettings] || difficultySettings.medium;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${topic} - ${subject} Learning Game</title>
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
  <style>
    body {
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: Arial, sans-serif;
    }
    #game-container {
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <div id="game-container"></div>
  <script>
    let gameScene;
    let player, playerEmoji, cursors;
    let scoreText, livesText, questionText, problemCounterText, hintsText;
    let score = 0, lives = 3, currentQ = 0, hintsRemaining = 3;
    let answerPlatforms = [];
    let gameActive = true;

    const problems = ${JSON.stringify(problems, null, 2)};

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'game-container',
      backgroundColor: '#87CEEB',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: ${settings.gravity} },
          debug: false
        }
      },
      scene: { create, update }
    };

    try {
      new Phaser.Game(config);
    } catch (error) {
      console.error('Game error:', error);
      document.getElementById('game-container').innerHTML =
        '<div style="color: red; padding: 20px;">Game failed to load: ' + error.message + '</div>';
    }

    function create() {
      gameScene = this;

      // Background
      this.add.rectangle(400, 300, 800, 600, 0x87CEEB);
      this.add.rectangle(400, 580, 800, 40, 0x228B22);

      // Clouds
      this.add.text(150, 80, '☁️', { fontSize: '40px' }).setOrigin(0.5);
      this.add.text(550, 120, '☁️', { fontSize: '35px' }).setOrigin(0.5);
      this.add.text(700, 90, '☁️', { fontSize: '38px' }).setOrigin(0.5);

      // Castle (goal)
      this.add.text(720, 500, '🏰', { fontSize: '48px' }).setOrigin(0.5);

      // Ground
      const ground = this.add.rectangle(400, 590, 800, 20, 0x8B4513);
      this.physics.add.existing(ground, true);

      // Static platforms
      const p1 = this.add.rectangle(200, 500, 120, 20, 0x32CD32);
      this.physics.add.existing(p1, true);

      const p2 = this.add.rectangle(400, 420, 120, 20, 0x32CD32);
      this.physics.add.existing(p2, true);

      const p3 = this.add.rectangle(600, 350, 120, 20, 0x32CD32);
      this.physics.add.existing(p3, true);

      // Player
      player = this.add.circle(80, 520, 25, 0x4169E1);
      this.physics.add.existing(player);
      player.body.setCollideWorldBounds(true);
      player.body.setBounce(0.1);

      playerEmoji = this.add.text(80, 520, '🤺', { fontSize: '48px' }).setOrigin(0.5);

      // Collisions
      this.physics.add.collider(player, ground);
      this.physics.add.collider(player, [p1, p2, p3]);

      // Controls
      cursors = this.input.keyboard.createCursorKeys();
      this.input.keyboard.on('keydown-H', () => showHint());
      this.input.keyboard.on('keydown-R', () => window.location.reload());

      // UI
      scoreText = this.add.text(20, 20, 'Score: 0', {
        fontSize: '28px',
        fill: '#000',
        backgroundColor: '#FFF',
        padding: { x: 8, y: 4 }
      });

      livesText = this.add.text(20, 60, '❤️❤️❤️', { fontSize: '28px' });

      hintsText = this.add.text(20, 100, '💡 Hints: 3', {
        fontSize: '24px',
        fill: '#FFD700',
        backgroundColor: '#000',
        padding: { x: 8, y: 4 }
      }).setInteractive().on('pointerdown', () => showHint());

      problemCounterText = this.add.text(400, 20, \`Problem 1 of \${problems.length}\`, {
        fontSize: '24px',
        fill: '#4B0082',
        backgroundColor: '#FFF',
        padding: { x: 12, y: 6 },
        fontStyle: 'bold'
      }).setOrigin(0.5);

      const questionBg = this.add.rectangle(400, 80, 350, 50, 0xFFFACD);
      questionBg.setStroke(0x4169E1, 3);

      questionText = this.add.text(400, 80, problems[0].question, {
        fontSize: '36px',
        fill: '#000',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      this.add.text(400, 550, 'Arrow Keys: Move | UP: Jump | H: Hint', {
        fontSize: '18px',
        fill: '#4B0082',
        backgroundColor: '#FFFACD',
        padding: { x: 12, y: 4 }
      }).setOrigin(0.5);

      // Create first set of answer platforms
      makeAnswers();
    }

    function makeAnswers() {
      // Clean up old platforms
      answerPlatforms.forEach(p => p.destroy());
      answerPlatforms = [];

      const curr = problems[currentQ];
      let answers = [curr.answer, ...curr.wrong];

      // Shuffle answers
      for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
      }

      // Create answer platforms - ALL GOLD initially
      answers.forEach((ans, i) => {
        const x = 120 + i * 160;
        const y = 250;

        const p = gameScene.add.rectangle(x, y, 100, 50, 0xFFD700);
        gameScene.physics.add.existing(p, true);

        const txt = gameScene.add.text(x, y, ans + '', {
          fontSize: '40px',
          fill: '#000',
          fontStyle: 'bold'
        }).setOrigin(0.5);

        p.ans = ans;
        p.txt = txt;
        p.correct = (ans === curr.answer);
        p.used = false;

        // Add overlap detection
        gameScene.physics.add.overlap(player, p, () => {
          if (p.used || !gameActive) return;
          p.used = true;

          if (p.correct) {
            // ✅ CORRECT
            score += 10;
            scoreText.setText('Score: ' + score);
            p.setFillStyle(0x00FF00);

            const feedback = gameScene.add.text(x, y - 70, '✅ CORRECT!', {
              fontSize: '32px',
              fill: '#0F0',
              backgroundColor: '#000',
              padding: { x: 10, y: 5 }
            }).setOrigin(0.5);

            // Sparkles
            for (let j = 0; j < 6; j++) {
              const star = gameScene.add.text(
                x + (Math.random() - 0.5) * 100,
                y + (Math.random() - 0.5) * 100,
                '⭐',
                { fontSize: '24px' }
              ).setOrigin(0.5);

              gameScene.tweens.add({
                targets: star,
                alpha: 0,
                y: star.y - 50,
                duration: 1000,
                onComplete: () => star.destroy()
              });
            }

            // Next problem
            gameScene.time.delayedCall(2000, () => {
              feedback.destroy();
              currentQ++;

              if (currentQ >= problems.length) {
                // Victory!
                gameActive = false;
                gameScene.add.text(400, 300, '🏆 YOU WIN! 🏆\\n\\nAll Problems Solved!\\nScore: ' + score + '\\n\\nPress R to Play Again', {
                  fontSize: '32px',
                  fill: '#FFD700',
                  backgroundColor: '#000',
                  padding: { x: 20, y: 15 },
                  align: 'center'
                }).setOrigin(0.5);

                // Confetti
                for (let i = 0; i < 15; i++) {
                  gameScene.time.delayedCall(i * 100, () => {
                    const cx = Math.random() * 800;
                    const cy = Math.random() * 300;
                    const confetti = gameScene.add.text(cx, cy, '🎉', { fontSize: '32px' });
                    gameScene.tweens.add({
                      targets: confetti,
                      y: cy + 400,
                      alpha: 0,
                      duration: 2000,
                      onComplete: () => confetti.destroy()
                    });
                  });
                }
              } else {
                // Next problem
                questionText.setText(problems[currentQ].question);
                problemCounterText.setText(\`Problem \${currentQ + 1} of \${problems.length}\`);

                const encourage = gameScene.add.text(400, 350, 'Next Problem! 💪', {
                  fontSize: '28px',
                  fill: '#4169E1',
                  backgroundColor: '#FFF',
                  padding: { x: 12, y: 8 }
                }).setOrigin(0.5);

                gameScene.time.delayedCall(1500, () => encourage.destroy());
                makeAnswers();
              }
            });

          } else {
            // ❌ WRONG
            lives--;
            livesText.setText('❤️'.repeat(Math.max(0, lives)));
            p.setFillStyle(0xFF0000);

            const feedback = gameScene.add.text(x, y - 70, '❌ Try Again!', {
              fontSize: '32px',
              fill: '#F00',
              backgroundColor: '#000',
              padding: { x: 10, y: 5 }
            }).setOrigin(0.5);

            gameScene.cameras.main.shake(200, 0.01);

            gameScene.time.delayedCall(2000, () => feedback.destroy());

            if (lives <= 0) {
              gameActive = false;
              gameScene.add.text(400, 300, '💔 GAME OVER\\n\\nPress R to Restart', {
                fontSize: '48px',
                fill: '#FFF',
                backgroundColor: '#000',
                padding: { x: 20, y: 15 },
                align: 'center'
              }).setOrigin(0.5);
            }
          }
        });

        answerPlatforms.push(p);
        answerPlatforms.push(txt);
      });
    }

    function showHint() {
      if (hintsRemaining <= 0 || !gameActive) return;

      hintsRemaining--;
      hintsText.setText('💡 Hints: ' + hintsRemaining);

      const problem = problems[currentQ].question;
      let hintText = 'Think carefully about the answer!';

      // Generate hint based on question
      if (problem.includes('×') || problem.includes('*')) {
        const parts = problem.split(/[×*]/);
        if (parts.length >= 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          hintText = \`Hint: \${num1} × \${num2} means adding \${num1} together \${num2} times\`;
        }
      } else if (problem.includes('+')) {
        hintText = 'Hint: Add the numbers together!';
      } else if (problem.includes('-')) {
        hintText = 'Hint: Subtract to find the difference!';
      } else if (problem.includes('÷') || problem.includes('/')) {
        hintText = 'Hint: How many times does it divide evenly?';
      }

      const hint = gameScene.add.text(400, 400, hintText, {
        fontSize: '20px',
        fill: '#FFD700',
        backgroundColor: '#4B0082',
        padding: { x: 12, y: 8 },
        align: 'center',
        wordWrap: { width: 600 }
      }).setOrigin(0.5);

      gameScene.time.delayedCall(3000, () => hint.destroy());
    }

    function update() {
      if (!gameActive) return;

      // Update player emoji position
      if (playerEmoji && player) {
        playerEmoji.setPosition(player.x, player.y);
      }

      // Movement
      if (cursors.left.isDown) {
        player.body.setVelocityX(-${settings.moveSpeed});
      } else if (cursors.right.isDown) {
        player.body.setVelocityX(${settings.moveSpeed});
      } else {
        player.body.setVelocityX(0);
      }

      // Jump
      if (cursors.up.isDown && player.body.touching.down) {
        player.body.setVelocityY(${settings.jumpPower});
      }
    }
  </script>
</body>
</html>`;
}
