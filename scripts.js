document.addEventListener('DOMContentLoaded', () => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteContainer = document.getElementById('note-container');
    
    const renderNotes = () => {
        noteContainer.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            
            const textArea = document.createElement('textarea');
            textArea.value = note;
            textArea.oninput = (e) => updateNote(index, e.target.value);
            
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.innerHTML = '&times;';
            deleteBtn.onclick = () => deleteNote(index);
            
            noteElement.appendChild(textArea);
            noteElement.appendChild(deleteBtn);
            noteContainer.appendChild(noteElement);
        });
    };
    
    const updateNote = (index, content) => {
        notes[index] = content;
        localStorage.setItem('notes', JSON.stringify(notes));
    };
    
    const deleteNote = (index) => {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    };
    
    const addNote = () => {
        notes.push('');
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    };
    
    renderNotes();
    window.addNote = addNote;
});
