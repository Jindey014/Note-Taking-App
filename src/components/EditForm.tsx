import { FormEvent, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import { NoteData, Tag } from '../App'
import { v4 as uuidV4 } from 'uuid'

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
} & NoteData

const NewForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = '',
  textarea = '',
  tags = [],
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    onSubmit({
      title: titleRef.current!.value,
      textarea: textareaRef.current!.value,
      tags: selectedTags,
    })
    navigate('..')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 md:px-12 flex flex-wrap flex-col gap-5  "
    >
      <label className="form-control w-full ">
        <div>
          <div className="label ">
            <span className="label-text text-xl ">Title</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-[350px] required  "
            ref={titleRef}
            required
            defaultValue={title}
          />
        </div>
      </label>
      <label className="form-control w-full">
        <div>
          <div className="label ">
            <span className="label-text text-xl ">Tags</span>
          </div>
          <CreatableSelect
            onCreateOption={(label) => {
              const newTag = { id: uuidV4(), label }
              onAddTag(newTag) //This function is created to store the new added tags in local storage
              setSelectedTags((prev) => [...prev, newTag]) //selected tags ma our old tags as well as the new tag we just created
            }}
            isMulti
            isClearable
            classNamePrefix="daisyui"
            styles={{
              menu: (base) => ({
                ...base,
                zIndex: 1000, // Ensure dropdown shows over other content
              }),
            }}
            className="rounded-xl w-[350px] "
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id } //creatableselect component requires label and value
            })}
            onChange={(tags) => {
              setSelectedTags(
                tags.map((tag) => {
                  return { label: tag.label, id: tag.value } // createselect le require gareko label and value lai hamro tag ko label and id ma convert gareko
                })
              )
            }}
            options={availableTags.map((tag) => {
              return { label: tag.label, value: tag.id }
            })}
          />
        </div>
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text text-xl">Body</span>
        </div>
        <textarea
          className="textarea textarea-bordered w-full "
          rows={10}
          ref={textareaRef}
          defaultValue={textarea}
        ></textarea>
      </label>
      <div className="flex gap-5">
        <button type="submit" className="btn btn-primary text-lg text-white">
          Save
        </button>
        <Link to="/">
          <button className="btn btn-active btn-neutral text-lg text-white">
            Cancel
          </button>
        </Link>
      </div>
    </form>
  )
}

export default NewForm
