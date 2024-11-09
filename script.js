const apiURL = "https://67295f836d5fa4901b6cf342.mockapi.io/api/v1/books";

document.getElementById('getData').addEventListener('click', getBooks);
document.getElementById('bookForm').addEventListener('submit', saveBook);

function getBooks() {
  fetch(apiURL)
    .then(response => response.json())
    .then(data => renderBooks(data))
    .catch(error => showMessage("데이터를 가져오는 데 실패했습니다.", "danger"));
}

function renderBooks(books) {
  const output = document.getElementById('output');
  output.innerHTML = '';
  books.forEach(book => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <strong>ID ${book.id}:</strong> ${book.title} by ${book.author}
          (${book.year}, ${book.publisher}, 회차: ${book.episode})
        </div>
        <div>
          <button class="btn btn-secondary btn-sm" onclick="editBook(${book.id})">수정</button>
          <button class="btn btn-danger btn-sm" onclick="deleteBook(${book.id})">삭제</button>
        </div>
      </div>
    `;
    output.appendChild(li);
  });
}

function saveBook(event) {
  event.preventDefault();
  const bookId = document.getElementById('bookId').value;
  const book = {
    title: document.getElementById('bookTitle').value,
    author: document.getElementById('bookAuthor').value,
    year: document.getElementById('bookYear').value,
    publisher: document.getElementById('bookPublisher').value,
    episode: document.getElementById('bookEpisode').value,
  };

  const method = bookId ? "PUT" : "POST";
  const url = bookId ? `${apiURL}/${bookId}` : apiURL;

  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  })
    .then(response => response.json())
    .then(() => {
      getBooks();
      const modal = bootstrap.Modal.getInstance(document.getElementById('bookModal'));
      modal.hide();
      showMessage(`도서 ${bookId ? "수정" : "추가"}되었습니다.`, "success");
      document.getElementById('bookForm').reset();
    })
    .catch(error => showMessage("작업을 수행하는 데 실패했습니다.", "danger"));
}

function editBook(id) {
  fetch(`${apiURL}/${id}`)
    .then(response => response.json())
    .then(book => {
      document.getElementById('bookId').value = book.id;
      document.getElementById('bookTitle').value = book.title;
      document.getElementById('bookAuthor').value = book.author;
      document.getElementById('bookYear').value = book.year;
      document.getElementById('bookPublisher').value = book.publisher;
      document.getElementById('bookEpisode').value = book.episode;
      const modal = new bootstrap.Modal(document.getElementById('bookModal'));
      modal.show();
    })
    .catch(error => showMessage("데이터를 가져오는 데 실패했습니다.", "danger"));
}

function deleteBook(id) {
  fetch(`${apiURL}/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      getBooks();
      showMessage("도서가 삭제되었습니다.", "success");
    })
    .catch(error => showMessage("삭제하는 데 실패했습니다.", "danger"));
}

function showMessage(message, type) {
  const messageDiv = document.getElementById("message");
  messageDiv.className = `alert alert-${type}`;
  messageDiv.textContent = message;
  messageDiv.classList.remove("d-none");
  setTimeout(() => {
    messageDiv.classList.add("d-none");
  }, 3000);
}

document.getElementById('searchData').addEventListener('click', function() {
  const searchTerm = prompt("검색할 도서명을 입력하세요:");
  if (searchTerm) {
    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        const filteredBooks = data.filter(book =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderBooks(filteredBooks);
      })
      .catch(error => showMessage("데이터를 가져오는 데 실패했습니다.", "danger"));
  }
});