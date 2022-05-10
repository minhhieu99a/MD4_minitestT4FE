function addNewBook() {
    let name = $('#name').val();
    let author = $('#author').val();
    let price = $('#price').val();
    let category = $(`#category`).val();
    let image = $(`#image`)
    let newBook =new FormData;
   newBook.append('name',name)
   newBook.append('price',price)
   newBook.append('author',author)
   newBook.append('category',category)
   newBook.append('image',image.prop('files')[0]);
    $.ajax({
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // },
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        type: "POST",
        data: newBook,
        url: `http://localhost:8080/books`,
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
                    `<td><img src="${'http://localhost:8080/image/'+data[i].image}" width="100px"></td>`+
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
            let img = `<img src="http://localhost:8080/image/${book.image}" width="100">`
                $(`#image1`).html(img)
            $("#action").html(content)
        }
    })
}

function updateBook(id) {
    let name = $(`#name1`).val();
    let author = $(`#author1`).val();
    let price = $(`#price1`).val();
    let category = $(`#category1`).val();
    let image =$(`#image2`);
    let editForm = new FormData;
    editForm.append('name',name)
    editForm.append('price',price)
    editForm.append('author',author)
    editForm.append('category',category)
    editForm.append('image',image.prop('files')[0]);
    if (image.prop('files')[0]===undefined){
        let file = new File([""],"filename.jpg")
        editForm.append('image',file);
    }
    $.ajax({
        // headers: {
        //     'Accepted': 'application/json',
        //     'Content-Type': 'application/json',
        // },
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        type:"POST",
        data :editForm,
        url: `http://localhost:8080/books/${id}`,
        success : function () {
            allBooks()
        }
    })
    event.preventDefault();
}

allCategory();
allBooks();