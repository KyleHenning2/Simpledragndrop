const dragItems = document.querySelectorAll('.ModContent');
let draggedItem = null;

// Add event listeners for drag and drop events to each drag item
dragItems.forEach(item => {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('drop', handleDrop);
});

// Drag start event handler
function handleDragStart(event) {
    draggedItem = event.target.closest('.ModContent');
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', draggedItem.innerHTML);
    event.target.style.opacity = '0.5';
}

// Drag over event handler
function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    const targetItem = event.target.closest('.ModContent');
    const dragItems = document.querySelectorAll('.ModContent');
    
    // Remove underline from all items
    dragItems.forEach(item => {
        item.style.borderTop = '';
        item.style.borderBottom = '';
    });

    if (targetItem && targetItem !== draggedItem) {
        const boundingRect = targetItem.getBoundingClientRect();
        const offset = boundingRect.y + (boundingRect.height / 2);
        
        // Determine where to underline
        if (event.clientY - offset > 0) {
            targetItem.style.borderBottom = 'solid 2px #000';
        } else {
            targetItem.style.borderTop = 'solid 2px #000';
        }
    }
}


// Drop event handler
function handleDrop(event) {
    event.preventDefault();
    const targetItem = event.target.closest('.ModContent');
    if (targetItem && targetItem !== draggedItem) {
        if (event.clientY > targetItem.getBoundingClientRect().top + (targetItem.offsetHeight / 2)) {
            targetItem.parentNode.insertBefore(draggedItem, targetItem.nextSibling);
        } else {
            targetItem.parentNode.insertBefore(draggedItem, targetItem);
        }
    }
    const dragItems = document.querySelectorAll('.ModContent');
    dragItems.forEach(item => {
        item.style.borderTop = '';
        item.style.borderBottom = '';
    });
    if (draggedItem) {
        draggedItem.style.opacity = '';
        draggedItem = null;
    }
}

