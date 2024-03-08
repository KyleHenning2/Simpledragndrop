// Define a constant variable 'dragItems' that stores all elements with class 'ModContent'
const dragItems = document.querySelectorAll('.ModContent');

// Initialize 'draggedItem' variable to null
let draggedItem = null;

// Add event listeners for drag and drop events to each drag item
dragItems.forEach(item => {
    // Add event listener for dragstart event
    item.addEventListener('dragstart', handleDragStart);
    // Add event listener for dragover event
    item.addEventListener('dragover', handleDragOver);
    // Add event listener for drop event
    item.addEventListener('drop', handleDrop);
});

// Drag start event handler
function handleDragStart(event) {
    // Set the draggedItem to the target element or its closest ancestor with class 'ModContent'
    draggedItem = event.target.closest('.ModContent');

    // Set the effectAllowed property of the dataTransfer object to 'move'
    event.dataTransfer.effectAllowed = 'move';

    // Set the data type and data of the dragged item for the drag operation
    event.dataTransfer.setData('text/html', draggedItem.innerHTML);

    // Change the opacity of the dragged item
    event.target.style.opacity = '0.5';
}

// Drag over event handler
function handleDragOver(event) {
    // Prevent the default behavior for the dragover event
    event.preventDefault();

    // Set the dropEffect property of the dataTransfer object to 'move'
    event.dataTransfer.dropEffect = 'move';

    // Find the closest ancestor of the event target with class 'ModContent'
    const targetItem = event.target.closest('.ModContent');

    // Get all elements with class 'ModContent'
    const dragItems = document.querySelectorAll('.ModContent');

    // Remove underline from all items
    dragItems.forEach(item => {
        item.style.borderTop = '';
        item.style.borderBottom = '';
    });

    // Check if targetItem exists and is not the same as the draggedItem
    if (targetItem && targetItem !== draggedItem) {
        // Calculate the vertical offset of the mouse pointer relative to the targetItem
        const boundingRect = targetItem.getBoundingClientRect();
        const offset = boundingRect.y + (boundingRect.height / 2);
        
        // Determine whether to underline the top or bottom of the targetItem based on mouse position
        if (event.clientY - offset > 0) {
            targetItem.style.borderBottom = 'solid 2px #000';
        } else {
            targetItem.style.borderTop = 'solid 2px #000';
        }
    }
}

// Drop event handler
function handleDrop(event) {
    // Prevent the default behavior for the drop event
    event.preventDefault();

    // Find the closest ancestor of the event target with class 'ModContent'
    const targetItem = event.target.closest('.ModContent');

    // Check if targetItem exists and is not the same as the draggedItem
    if (targetItem && targetItem !== draggedItem) {
        // Determine the position to insert the draggedItem based on mouse position
        if (event.clientY > targetItem.getBoundingClientRect().top + (targetItem.offsetHeight / 2)) {
            // Insert the draggedItem after the targetItem
            targetItem.parentNode.insertBefore(draggedItem, targetItem.nextSibling);
        } else {
            // Insert the draggedItem before the targetItem
            targetItem.parentNode.insertBefore(draggedItem, targetItem);
        }
    }

    // Get all elements with class 'ModContent'
    const dragItems = document.querySelectorAll('.ModContent');

    // Remove underline from all items
    dragItems.forEach(item => {
        item.style.borderTop = '';
        item.style.borderBottom = '';
    });

    // Reset the opacity of the draggedItem and set draggedItem to null
    if (draggedItem) {
        draggedItem.style.opacity = '';
        draggedItem = null;
    }
}
