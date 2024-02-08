import logo from './assets/icone-svg.svg'
import { NewNoteCard } from './components/main/cards/new-note-card'
import { NoteCard } from './components/main/cards/note-card'
import { SearchInput } from './components/main/search/search-input'

export function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} />
      <SearchInput />
      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard />
        <NoteCard
          note={{
            date: new Date(),
            content: 'Ola',
          }}
        />
      </div>
    </div>
  )
}
