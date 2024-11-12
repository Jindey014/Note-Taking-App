import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import New from './pages/New'
import ShowDetail from './pages/ShowDetail'
import Edit from './pages/Edit'
import { useMemo } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { v4 as uuidV4 } from 'uuid'
import NoteLayout from './pages/NoteLayout'

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  textarea: string
  tagIds: string[]
}

export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title: string
  tags: Tag[]
  textarea: string
}

export type Tag = {
  id: string
  label: string
}

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      }
    })
  }, [notes, tags])

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ]
    })
  }
  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag])
  }
  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            ...data,
            tagIds: tags.map((tag) => tag.id),
          }
        } else {
          return note
        }
      })
    })
  }

  const onDeleteNote = (id: string) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id)
    })
  }

  const updateTags = (id: string, label: string) => {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  const deleteTag = (id: string) => {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id)
    })
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Home
          availableTags={tags}
          notes={notesWithTags}
          updateTag={updateTags}
          deleteTag={deleteTag}
        />
      ),
    },
    {
      path: '/new',
      element: (
        <New onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />
      ),
    },
    {
      path: '/:id',
      element: <NoteLayout notes={notesWithTags} />,
      children: [
        {
          path: '',
          element: <ShowDetail onDelete={onDeleteNote} />,
        },
        {
          path: 'edit',
          element: (
            <Edit
              onSubmit={onUpdateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          ),
        },
      ],
    },
    {
      path: '*',
      element: (
        <Home
          availableTags={tags}
          notes={notesWithTags}
          updateTag={updateTags}
          deleteTag={deleteTag}
        />
      ),
    },
  ])

  return (
    <div className=" ">
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
