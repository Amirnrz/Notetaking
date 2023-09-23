// select nedded elements
const form = document.querySelector('form')
const notesWrapper = document.querySelector("section")
const detailsContainer = document.querySelector(".details-container")

let notes = []


// functions

// local storage functions
const setToLocalStorage = () => localStorage.setItem('notes', JSON.stringify(notes))

const getFromLocalStorage = (item) => {
  const items = JSON.parse(localStorage.getItem(item)) || []
  notes = [...items]
  renderNotes(notes)
}

// Note functions

// CreateNote-Function
const createNote = (title,desc) => {
  const newNote = {
    title,
    desc,
    id: crypto.randomUUID(),
  }
  notes.push(newNote)
  setToLocalStorage(newNote)
  renderNotes(notes)
}

// Render new and Prev Notes
const renderNotes = (notes) => {
  if(notes.length > 0) {
    let noteList = notes.map(note => note.innerHTML = `
      <div class= "note-list" id="${note.id}">
        <div class="note-list-content">
          <h1 class="note-list_title">${note.title}</h1>
          <p class="note-list_desc">${note.desc.slice(0,40)} ...</p>
        </div> 
        <div class="note-list-btns">
          <button class="btn detail-btn">Details</button>
          <button class="btn delete-btn">Remove</button>
        </div> 
      </div>
    `).join("")
    notesWrapper.innerHTML = noteList
  }
  return
}

// Remove-Note
function removeNote(note) {
  note.remove()
  notes.forEach((noteItem,idx) => {
    if(noteItem.id === note.id) {
      notes.splice(idx,1)
    }
    localStorage.setItem('notes',JSON.stringify(notes))
  })
}

// Show note Detail
function showDetail(containerDiv) {
  const element = notes.filter(el => el.id === containerDiv.id)[0]
  const noteDetail = document.createElement('div')
  noteDetail.classList.add('note-detail')
  noteDetail.innerHTML = `
    <h1>${element.title}</h1>
    <p>${element.desc}</p>
    <button class="close-btn">X</button>
  `
  detailsContainer.classList.add('active')
  detailsContainer.appendChild(noteDetail)
}


// event listeners

// Submit-Event
form.addEventListener('submit',(e) => {
  e.preventDefault()
  const titleInput = document.querySelector('#title')
  const NoteInput = document.querySelector('#note')
  createNote(titleInput.value,NoteInput.value)
  titleInput.value = ""
  NoteInput.value = ""
})

// ONLoad-Event
window.addEventListener('DOMContentLoaded',getFromLocalStorage('notes'))

// DeleteNote-Event
notesWrapper.addEventListener("click",(e) => {
  if(e.target.classList.contains('delete-btn')){
    removeNote(e.target.parentElement.parentElement)
  }
  if(e.target.classList.contains("detail-btn")) {
    showDetail(e.target.parentElement.parentElement)
  }
})


// remove detail
detailsContainer.addEventListener("click", (e) => {
  if(e.target.classList.contains("close-btn")) {
    detailsContainer.classList.remove("active")
    e.target.parentElement.remove()
  }
})