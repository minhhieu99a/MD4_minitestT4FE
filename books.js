function addNewBook() {
    let name = $('#name').val();
    let author = $('#author').val();
    let price = $('#price').val();
    let category = $('#category').val();
    let newBook = {
        name: name,
        author: author,
        price: price,
        category: {
            id: parseInt(category)
        },
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newBook),
        url: "http://localhost:8080/books",
        success: function () {
            allBooks();
        }
    })
    event.preventDefault();
}

function allBooks() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/books",
        success: function (data) {
            let content = '';
            for (let i = 0; i < data.length; i++) {
                content += `<tr><td>${data[i].id}</td>
                        <td>${data[i].name}</td>` +
                    `<td>${data[i].author}</td>` +
                    `<td>${data[i].price}</td>` +
                    ` <td>${data[i].category.name}</td>` +
                    `<td><button onclick="deleteBook(${data[i].id})" data-bs-toggle="modal" >Delete</button><td/>
                 <td><button type="button" onclick="showEditForm(${data[i].id})" data-bs-toggle="modal" data-bs-target="#myModal">Update</button></td>` +
                    `</tr>`
            }
            // document.getElementById("booklist").innerHTML = content;
            $("#showList").html(content);
        },
    })
}

function allCategory() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/books/cate",
        success: function (category) {
            let content = '';
            for (let i = 0; i < category.length; i++) {
                content += `<option value="${category[i].id}">${category[i].name}</option>`
            }
            $("#category").html(content);
            $("#category1").html(content);

        },
    })
}

function deleteBook(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/books/${id}`,
        success: function () {
            allBooks()
        }
    })
    event.preventDefault();
}

function showEditForm(id) {
    let content = `<button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="updateBook(${id})">Update</button>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>`
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/books/${id}`,
        success: function (book) {
            $(`#name1`).val(book.name),
                $(`#author1`).val(book.author),
                $(`#price1`).val(book.price),
                $(`#category1`).val(book.category.name)
            $("#action").html(content)
        }
    })
}

function updateBook(id) {
    let name = $(`#name1`).val();
    let author = $(`#author1`).val();
    let price = $(`#price1`).val();
    let category = $(`#category1`).val();
    let editForm = {
        id : id,
        name: name,
        author: author,
        price: price,
        category: {
            id: parseInt(category)
        },
    }
    $.ajax({
        headers: {
            'Accepted': 'application/json',
            'Content-Type': 'application/json',
        },
        type:"PUT",
        data :JSON.stringify(editForm),
        url: `http://localhost:8080/books/${id}`,
        success : function () {
            allBooks()
        }
    })
}

allCategory();
allBooks();