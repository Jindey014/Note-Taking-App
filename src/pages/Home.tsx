import { useMemo, useState } from 'react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'
import { Note, Tag } from '../App'
import NoteCard, { SimplifiedNote } from '../components/NoteCard'
import { Button, Col, Form, Row, Stack, Modal } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'

export type NoteListProps = {
  availableTags: Tag[]
  notes: SimplifiedNote[]
  deleteTag: (id: string) => void
  updateTag: (id: string, label: string) => void
}
type EditTagsModalProps = {
  availableTags: Tag[]
  show: boolean
  handleClose: () => void
  deleteTag: (id: string) => void
  updateTag: (id: string, label: string) => void
}

const Home: React.FC = ({
  availableTags,
  notes,
  updateTag,
  deleteTag,
}: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState('')
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    const bootstrapCSS = document.createElement('link')
    bootstrapCSS.href =
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'
    bootstrapCSS.rel = 'stylesheet'

    bootstrapCSS.crossOrigin = 'anonymous'
    document.head.appendChild(bootstrapCSS)

    return () => {
      document.head.removeChild(bootstrapCSS) // Clean up on unmount
    }
  }, [])

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === '' ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      )
    })
  }, [title, selectedTags, notes])

  return (
    <>
      <div className="p-3 md:px-12 mb-4">
        <div className="mb-10">
          <div className=" mb-5  flex justify-between">
            <div className="text-4xl">Notes</div>
            <div className="button-group flex gap-3">
              <Link to="/new">
                <button className="btn btn-primary text-lg">Create</button>
              </Link>
              <button
                onClick={handleShow}
                className="btn  bg-transparent border-gray-500 text-lg"
              >
                Edit Tags
              </button>
            </div>
          </div>
          <form action="" className="flex gap-4 md:gap-8">
            <label className="form-control w-full ">
              <div>
                <div className="label ">
                  <span className="label-text text-xl ">Title</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered required w-full "
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </label>
            <label className="form-control w-full ">
              <div>
                <div className="label ">
                  <span className="label-text text-xl ">Tags</span>
                </div>
                <ReactSelect
                  isMulti
                  isClearable
                  classNamePrefix="daisyui"
                  styles={{
                    menu: (base) => ({
                      ...base,
                      zIndex: 1000, // Ensure dropdown shows over other content
                    }),
                    control: (provided) => ({
                      ...provided,
                      fontSize: '16px', // Adjust font size
                      minHeight: '45px', // Adjust minimum height
                      borderRadius: '0.5rem',
                    }),
                  }}
                  className="rounded-xl min-w-[250px] "
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
          </form>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {filteredNotes.map((note) => (
            <div key={note.id}>
              <NoteCard id={note.id} title={note.title} tags={note.tags} />
            </div>
          ))}
        </div>
      </div>
      <EditTagsModal
        availableTags={availableTags}
        show={show}
        handleClose={handleClose}
        updateTag={updateTag}
        deleteTag={deleteTag}
      />
    </>
  )
}

export default Home

function EditTagsModal({
  availableTags,
  handleClose,
  show,
  updateTag,
  deleteTag,
}: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>Edit Tags</Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={(e) => updateTag(tag.id, e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    onClick={() => deleteTag(tag.id)}
                    variant="outline-danger"
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
