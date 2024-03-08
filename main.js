const fills = document.querySelectorAll('.fill');

fills.forEach(fill => {
    fill.addEventListener('dragstart', dragStart);
    fill.addEventListener('dragend', dragEnd);
    fill.addEventListener('dragover', dragOver);
    fill.addEventListener('dragenter', dragEnter);
    fill.addEventListener('dragleave', dragLeave);
    fill.addEventListener('drop', dragDrop);
});

let draggedItem = null;
let insertLine = document.createElement('div');
insertLine.className = 'insert-line';

// Drag Functions

function dragStart() {
    draggedItem = this;
    setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
    draggedItem = null;
    this.className = 'fill';
    insertLine.remove(); // Remove the insert line when dragging ends
}

function dragOver(e) {
    e.preventDefault(); // Prevent default behavior
    // Ensure the insert line is always present when dragging over an element
    if (!this.classList.contains('hovered')) {
        this.classList.add('hovered');
        this.parentNode.insertBefore(insertLine, this);
    }
}


function dragEnter(e) {
    e.preventDefault();
    this.classList.add('hovered');
    // Insert the line before the current element
    this.parentNode.insertBefore(insertLine, this);
}

function dragLeave(e) {
    // Check if the element being dragged is actually leaving the container
    if (!e.relatedTarget || !this.contains(e.relatedTarget)) {
        this.classList.remove('hovered');
        insertLine.remove(); // Remove the insert line when leaving the element
    }
}

function dragDrop() {
    this.classList.remove('hovered');
    // Insert the dragged item before the current element
    this.parentNode.insertBefore(draggedItem, this);
    insertLine.remove(); // Remove the insert line after dropping the item
}