import { NoteData, Tag } from '../App'
import EditForm from '../components/EditForm'

import { useNote } from './NoteLayout'

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

const Edit = ({ onSubmit, onAddTag, availableTags }: EditNoteProps) => {
  const note = useNote()
  return (
    <>
      <div className="text-4xl mb-5 p-5 md:px-12">Edit Note</div>
      <EditForm
        title={note.title}
        textarea={note.textarea}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  )
}

export default Edit
