import { Link } from 'react-router-dom'
import { Tag } from '../App'

export type SimplifiedNote = {
  tags: Tag[]
  title: string
  id: string
}

const NoteCard = ({ id, title, tags }: SimplifiedNote) => {
  return (
    <Link to={`${id}`}>
      <div className="card bg-base-100 w-full min-h-[200px] shadow-md hover:shadow-xl items-center justify-center hover:-translate-y-3 transition-all ">
        <div className="card-body items-center justify-center">
          <h2 className="card-title  mb-4 no-underline">{title}</h2>

          {tags.length > 0 && (
            <div className="card-actions flex">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="badge bg-blue-600 badge-outline border-none text-white font-semibold p-3 "
                >
                  {tag.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default NoteCard
