// Get the reference to the DOM element with id "agendaList"
const agendaList = document.getElementById("agendaList");

// Add a dragstart event listener to the agendaList
agendaList.addEventListener("dragstart", e => {
    // Find the closest ancestor of the dragged item with class "ModContent"
    const draggingItem = e.target.closest(".ModContent");
    // Add the class "dragging" to the dragged item
    draggingItem.classList.add("dragging");
});

// Add a dragend event listener to the agendaList
agendaList.addEventListener("dragend", e => {
    // Find the dragged item within the agendaList
    const draggingItem = agendaList.querySelector(".dragging");
    // Remove the class "dragging" from the dragged item
    draggingItem.classList.remove("dragging");
});

// Define a function to initialize sortable list
const initSortableList = e => {
    e.preventDefault();
    // Find the dragged item within the agendaList
    const draggingItem = agendaList.querySelector(".dragging");
    // Get an array of sibling elements excluding the dragged item
    const siblings = Array.from(agendaList.children).filter(child => child !== draggingItem);

    // Find the next sibling element based on mouse position
    const nextSibling = siblings.find(sibling => {
        const rect = sibling.getBoundingClientRect();
        const mouseY = e.clientY;
        // Check if the mouseY is above the center of the sibling element
        return mouseY < rect.top + rect.height / 2;
    });

    // Reorder the list items based on the position of the next sibling
    if (nextSibling) {
        agendaList.insertBefore(draggingItem, nextSibling);
    } else {
        agendaList.appendChild(draggingItem);
    }
};

// Add a dragover event listener to the agendaList and call initSortableList
agendaList.addEventListener("dragover", initSortableList);

// Add a dragenter event listener to the agendaList to prevent default behavior
agendaList.addEventListener("dragenter", e => e.preventDefault());
