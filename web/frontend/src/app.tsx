import { ChangeEvent, useState } from 'react'
import logo from './assets/icone-svg.svg'
import { NewNoteCard } from './components/main/cards/new-note-card'
import { NoteCard } from './components/main/cards/note-card'

interface Note {
  id: string
  date: Date
  content: string
}

export function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }

    return []
  })

  const oneNoteCreated = (content: string) => {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const notesArray = [newNote, ...notes]

    // Assim determino que a ordem sempre fique decrescente.
    setNotes(notesArray)

    // TODO trocar o localstorage para um banco de dados relacional para persistir esses dados
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  const oneNoteDeleted = (id: string) => {
    const notesArray = notes.filter(note => {
      return note.id !== id
    })

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value

    setSearch(query)
  }

  const filteredNotes =
    search !== '' ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : notes

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logo} />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas.."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          onChange={handleSearch}
        />
      </form>
      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard oneNoteCreated={oneNoteCreated} />
        {filteredNotes.map(note => {
          return <NoteCard key={note.id} note={note} oneNoteDeleted={oneNoteDeleted} />
        })}
      </div>
    </div>
  )
}
