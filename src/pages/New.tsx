import { NoteData, Tag } from '../App'
import NewForm from '../components/NewForm'

type NewNoteProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

const New = ({ onSubmit, onAddTag, availableTags }: NewNoteProps) => {
  return (
    <>
      <div className="text-4xl mb-5 p-5 md:px-12">New Note</div>
      <NewForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  )
}

export default New
