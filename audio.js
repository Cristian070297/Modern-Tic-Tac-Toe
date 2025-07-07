class AudioManager {
    constructor() {
        this.audioContext = null;
        this.backgroundMusicEnabled = true;
        this.soundEnabled = true;
        this.currentOscillator = null;
        this.gainNode = null;
        this.visualizer = null;
        this.isPlaying = false;
        
        this.initializeAudio();
    }

    async initializeAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.gainNode = this.audioContext.createGain();
            this.gainNode.connect(this.audioContext.destination);
            this.gainNode.gain.value = 0.1;
            
            this.visualizer = document.getElementById('audioVisualizer');
            this.setupEventListeners();
            
        } catch (error) {
            console.log('Audio not supported');
        }
    }

    setupEventListeners() {
        const audioBtn = document.getElementById('audioBtn');
        audioBtn.addEventListener('click', () => this.toggleBackgroundMusic());
        
        // Auto-start music on first user interaction
        document.addEventListener('click', () => {
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
        }, { once: true });
    }

    toggleBackgroundMusic() {
        const audioBtn = document.getElementById('audioBtn');
        
        if (this.backgroundMusicEnabled) {
            this.stopBackgroundMusic();
            audioBtn.textContent = '🔇 Music Off';
            audioBtn.classList.add('muted');
        } else {
            this.startBackgroundMusic();
            audioBtn.textContent = '🎵 Music On';
            audioBtn.classList.remove('muted');
        }
        
        this.backgroundMusicEnabled = !this.backgroundMusicEnabled;
    }

    startBackgroundMusic() {
        if (!this.audioContext || this.isPlaying) return;
        
        this.isPlaying = true;
        this.visualizer.classList.add('active');
        this.playAmbientMusic();
    }

    stopBackgroundMusic() {
        if (this.currentOscillator) {
            this.currentOscillator.stop();
            this.currentOscillator = null;
        }
        this.isPlaying = false;
        this.visualizer.classList.remove('active');
    }

    playAmbientMusic() {
        if (!this.audioContext || !this.isPlaying) return;

        // Create a soothing ambient pad
        const osc1 = this.audioContext.createOscillator();
        const osc2 = this.audioContext.createOscillator();
        const osc3 = this.audioContext.createOscillator();
        
        const gain1 = this.audioContext.createGain();
        const gain2 = this.audioContext.createGain();
        const gain3 = this.audioContext.createGain();
        
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800;
        
        // Ambient chord progression
        const baseFreq = 220; // A3
        osc1.frequency.value = baseFreq;
        osc2.frequency.value = baseFreq * 1.25; // Major third
        osc3.frequency.value = baseFreq * 1.5;  // Perfect fifth
        
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc3.type = 'triangle';
        
        gain1.gain.value = 0.03;
        gain2.gain.value = 0.02;
        gain3.gain.value = 0.01;
        
        // Connect nodes
        osc1.connect(gain1);
        osc2.connect(gain2);
        osc3.connect(gain3);
        
        gain1.connect(filter);
        gain2.connect(filter);
        gain3.connect(filter);
        
        filter.connect(this.gainNode);
        
        // Start oscillators
        osc1.start();
        osc2.start();
        osc3.start();
        
        this.currentOscillator = osc1; // Keep reference for stopping
        
        // Add subtle frequency modulation for interest
        this.addFrequencyModulation(osc1, osc2, osc3);
        
        // Continue playing
        setTimeout(() => {
            if (this.isPlaying) {
                osc1.stop();
                osc2.stop();
                osc3.stop();
                this.playAmbientMusic();
            }
        }, 8000);
    }

    addFrequencyModulation(osc1, osc2, osc3) {
        const lfo = this.audioContext.createOscillator();
        const lfoGain = this.audioContext.createGain();
        
        lfo.frequency.value = 0.1; // Very slow modulation
        lfo.type = 'sine';
        lfoGain.gain.value = 2;
        
        lfo.connect(lfoGain);
        lfoGain.connect(osc1.frequency);
        lfoGain.connect(osc2.frequency);
        lfoGain.connect(osc3.frequency);
        
        lfo.start();
    }

    // Sound effects
    playMoveSound() {
        if (!this.audioContext || !this.soundEnabled) return;
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.gainNode);
        
        osc.frequency.value = 800;
        osc.type = 'sine';
        
        gain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
        
        osc.start();
        osc.stop(this.audioContext.currentTime + 0.2);
    }

    playWinSound() {
        if (!this.audioContext || !this.soundEnabled) return;
        
        // Victory fanfare
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        
        notes.forEach((freq, index) => {
            setTimeout(() => {
                const osc = this.audioContext.createOscillator();
                const gain = this.audioContext.createGain();
                
                osc.connect(gain);
                gain.connect(this.gainNode);
                
                osc.frequency.value = freq;
                osc.type = 'triangle';
                
                gain.gain.setValueAtTime(0.15, this.audioContext.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
                
                osc.start();
                osc.stop(this.audioContext.currentTime + 0.5);
            }, index * 200);
        });
    }

    playLoseSound() {
        if (!this.audioContext || !this.soundEnabled) return;
        
        // Descending notes for loss
        const notes = [523.25, 440, 349.23, 261.63]; // C5, A4, F4, C4
        
        notes.forEach((freq, index) => {
            setTimeout(() => {
                const osc = this.audioContext.createOscillator();
                const gain = this.audioContext.createGain();
                
                osc.connect(gain);
                gain.connect(this.gainNode);
                
                osc.frequency.value = freq;
                osc.type = 'sawtooth';
                
                gain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);
                
                osc.start();
                osc.stop(this.audioContext.currentTime + 0.4);
            }, index * 150);
        });
    }

    playDrawSound() {
        if (!this.audioContext || !this.soundEnabled) return;
        
        // Neutral sound for draw
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.gainNode);
        
        osc.frequency.value = 440;
        osc.type = 'sine';
        
        gain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.8);
        
        osc.start();
        osc.stop(this.audioContext.currentTime + 0.8);
    }

    playHoverSound() {
        if (!this.audioContext || !this.soundEnabled) return;
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.gainNode);
        
        osc.frequency.value = 1200;
        osc.type = 'sine';
        
        gain.gain.setValueAtTime(0.05, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        osc.start();
        osc.stop(this.audioContext.currentTime + 0.1);
    }

    playClickSound() {
        if (!this.audioContext || !this.soundEnabled) return;
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.gainNode);
        
        osc.frequency.value = 600;
        osc.type = 'square';
        
        gain.gain.setValueAtTime(0.08, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        osc.start();
        osc.stop(this.audioContext.currentTime + 0.1);
    }
}

// Initialize audio manager
const audioManager = new AudioManager();
