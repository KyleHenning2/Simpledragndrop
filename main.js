const fills = document.querySelectorAll('.fill');
let draggedItem = null;
let insertLine = document.createElement('div');
insertLine.className = 'insert-line';

fills.forEach(fill => {
    fill.addEventListener('dragstart', dragStart);
    fill.addEventListener('dragend', dragEnd);
    fill.addEventListener('dragover', dragOver);
    fill.addEventListener('dragenter', dragEnter);
    fill.addEventListener('dragleave', dragLeave);
    fill.addEventListener('drop', dragDrop);
});

function dragStart() {
    draggedItem = this;
    setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
    draggedItem = null;
    this.className = 'fill';
    removeInsertLine();
}

function dragOver(e) {
    e.preventDefault();
    if (!this.classList.contains('hovered')) {
        this.classList.add('hovered');
        insertInsertLine(this, e.clientY);
    }
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add('hovered');
    insertInsertLine(this, e.clientY);
}

function dragLeave(e) {
    if (!e.relatedTarget || !this.contains(e.relatedTarget)) {
        this.classList.remove('hovered');
        removeInsertLine();
    }
}

function dragDrop() {
    this.classList.remove('hovered');
    if (isTopHalf(this, event.clientY)) {
        this.parentNode.insertBefore(draggedItem, this);
    } else {
        this.parentNode.insertBefore(draggedItem, this.nextSibling);
    }
    removeInsertLine();
}

function insertInsertLine(element, y) {
    if (isTopHalf(element, y)) {
        element.parentNode.insertBefore(insertLine, element);
    } else {
        element.parentNode.insertBefore(insertLine, element.nextSibling);
    }
}

function removeInsertLine() {
    insertLine.remove();
}

function isTopHalf(element, y) {
    const rect = element.getBoundingClientRect();
    return y < rect.top + rect.height / 2;
}
