import ReactMarkdown from 'react-markdown'
import { useNote } from './NoteLayout'
import { Link, useNavigate } from 'react-router-dom'

type NoteProps = {
  onDelete: (id: string) => void
}

const ShowDetail = ({ onDelete }: NoteProps) => {
  const note = useNote()
  const navigate = useNavigate()
  return (
    <>
      <div className="p-5 md:px-12 items-center mb-4 flex justify-between ">
        <div className=" flex flex-col gap-4 ">
          <div className="text-4xl j">{note.title}</div>
          {note.tags.length > 0 && (
            <div className="card-actions flex flex-wrap">
              {note.tags.map((tag) => (
                <div
                  key={tag.id}
                  className="badge bg-blue-600 border-none text-white font-semibold p-3"
                >
                  {tag.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 md:gap-4">
          <Link to={`/${note.id}/edit`}>
            <button className="btn btn-primary text-white md:text-lg">
              Edit
            </button>
          </Link>

          <button
            onClick={() => {
              onDelete(note.id)
              navigate('..')
            }}
            className="btn  text-red-600  border-red-600 hover:bg-red-400 hover:text-black bg-transparent md:text-lg"
          >
            Delete
          </button>
          <Link to="/">
            <button className="btn  text-gray-600  border-gray-600 hover:bg-gray-400 hover:text-white bg-transparent md:text-lg">
              Back
            </button>
          </Link>
        </div>
      </div>
      <div className="px-5 md:px-12">
        <ReactMarkdown>{note.textarea}</ReactMarkdown>
      </div>
    </>
  )
}
export default ShowDetail
