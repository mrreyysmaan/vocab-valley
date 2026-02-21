# ⚔️ Vocab Valley — The Word Adventure

A fantasy RPG-style vocabulary learning game for Malaysian classrooms. Teachers create word quests with Gemini AI, students embark on adventures to conquer each word!

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up your Gemini API key
cp .env.example .env
# Edit .env and add your key from https://aistudio.google.com/

# 3. Run the dev server
npm run dev
```

## 🗺️ How It Works

### For Teachers (`/create`)
1. Enter a list of vocabulary words (comma or newline separated)
2. Click **Generate with Gemini** — AI creates definitions, synonyms, and fill-in-the-blank sentences
3. Copy the generated link and share with students (WhatsApp, Google Classroom, etc.)

### For Students (`/play?data=...`)
1. Open the teacher's link
2. **Study Phase** — Read the Ancient Scroll: word, definition, synonym, example sentence
3. **Map Phase** — Watch your hero travel to the next level
4. **Challenge Phase** — Fill in the blank with the correct word
5. **Complete** — See your final score and star rating!

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 + Vite + TypeScript | Framework |
| Tailwind CSS v4 | Styling |
| Framer Motion (`motion`) | Animations |
| `@google/genai` | Gemini AI API |
| `react-router-dom` | Routing |
| `lz-string` | URL compression (no database!) |
| `canvas-confetti` | Celebration effects |
| `lucide-react` | Icons |

## 📁 Project Structure

```
src/
├── pages/
│   ├── Landing.tsx       # Home page
│   ├── Create.tsx        # Teacher editor
│   └── Play.tsx          # Game runner
├── components/
│   ├── GameIntro.tsx     # Title screen
│   ├── StudyPhase.tsx    # Ancient scroll study view
│   ├── MapPhase.tsx      # Travel animation
│   ├── ChallengePhase.tsx # Fill-in-the-blank quiz
│   └── GameComplete.tsx  # Final score screen
├── hooks/
│   └── useTTS.ts         # Text-to-speech hook
└── lib/
    ├── gemini.ts         # Gemini API integration
    └── compression.ts   # lz-string URL encoding/decoding
```

## 🎨 Design

- **Aesthetic**: Warm storybook RPG — parchment scrolls, golden borders, forest greens
- **Fonts**: Cinzel Decorative (titles) + Nunito (body)
- **No database** — all state lives in the URL via compressed JSON

## 🌏 Made for Malaysian Classrooms

Built with Malaysian primary school students (ages 10-12) in mind. Simple, friendly, and exciting!
