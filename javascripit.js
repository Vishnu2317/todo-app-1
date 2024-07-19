let userId = 1;
const inputText = document.getElementById('inputText');
const createButton = document.getElementById('createButton');
const dataTable = document.getElementById('dataTable').querySelector('tbody');
const modal = document.getElementById('modal');
const modalInput = document.getElementById('modalInput');
const modalSaveButton = document.getElementById('modalSaveButton');
const modalTitle = document.getElementById('modalTitle');
const closeButton = document.querySelector('.close');

let currentEditRow = null;

createButton.addEventListener('click', () => {
    const text = inputText.value.trim();
    if (text === "") return;

    const row = dataTable.insertRow();
    row.insertCell(0).innerText = text;
    row.insertCell(1).innerText = userId++;
    const editCell = row.insertCell(2);
    const deleteCell = row.insertCell(3);
    const viewCell = row.insertCell(4);

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => openModal('Edit', row));
    editCell.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this item?')) {
            row.remove();
        }
    });
    deleteCell.appendChild(deleteButton);

    const viewButton = document.createElement('button');
    viewButton.innerText = 'View';
    viewButton.addEventListener('click', () => openModal('View', row));
    viewCell.appendChild(viewButton);

    inputText.value = '';
});

function openModal(action, row) {
    modal.style.display = 'block';
    currentEditRow = row;
    modalTitle.innerText = action + `Item`;
    modalInput.value = row.cells[0].innerText;
    modalSaveButton.style.display = action === 'Edit' ? 'inline-block' : 'none';
}

modalSaveButton.addEventListener('click', () => {
    currentEditRow.cells[0].innerText = modalInput.value;
    modal.style.display = 'none';
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});