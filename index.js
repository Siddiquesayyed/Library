addList()

$(".form").submit(function (e) {

    let BookName = $(".BookName").val();
    let AuthorName = $(".AuthorName").val();

    let Mechanical = $(".Mechanical");
    let Computer = $(".Computer");
    let Civil = $(".Civil");
    let Electrical = $(".Electrical");
    let Automobile = $(".Automobile");

    let Field = ""
    if ($("input[type='radio'].Computer").is(':checked')) { Field = Computer.val(); }
    else if ($("input[type='radio'].Civil").is(':checked')) { Field = Civil.val(); }
    else if ($("input[type='radio'].Mechanical").is(':checked')) { Field = Mechanical.val(); }
    else if ($("input[type='radio'].Electrical").is(':checked')) { Field = Electrical.val(); }
    else if ($("input[type='radio'].Automobile").is(':checked')) { Field = Automobile.val(); }
    let notes = localStorage.getItem('note');
    if (notes == null) {
        noteobj = []
    } else {
        noteobj = JSON.parse(notes);
    }
    noteobj.unshift([BookName, AuthorName, Field]);
    localStorage.setItem('note', JSON.stringify(noteobj))
    let Book = new book(BookName, AuthorName, Field);
    let display = new Display()
    if (display.validate(Book)) {
        addList();
        display.clear();
        display.show('success', ' your book has been successfully added')
    } else {
        display.show('danger', '  first fill the form')
    }
    e.preventDefault();
});
function book(name, author, field) {
    this.name = name,
        this.author = author,
        this.field = field
}
class Display {
    clear = function () {
        // put '0' ! important;
        $(".form")[0].reset();
    }
    validate = function (Book) {
        if (Book.name.length < 3 || Book.author.length < 3) {
            return false;
        } else {
            return true;
        }
    }
    show = function (alert, reason) {

        if (alert == 'danger') {
            let message = document.getElementById('Alert');
            message.innerHTML = ` <div class="alert alert-danger sticky-top alert-dismissible fade show z-3 position-absolute top-0 start-0 w-100 p-1 rounded-0" role="alert">
            <strong>Sorry !</strong> ${reason}.
        </div>`

            setTimeout(() => {
                message.innerHTML = ''
            }, 3000)

        } else {
            let message = document.getElementById('Alert');
            message.innerHTML = ` <div class="alert alert-${alert} sticky-top alert-dismissible fade show z-3 position-absolute top-0 start-0 w-100 p-1 rounded-0" role="alert">
            <strong>${alert}</strong> ${reason}.
        </div>`

            setTimeout(() => {
                message.innerHTML = ''
            }, 3000)
        }
    }
}
function addList() {
    let notes = localStorage.getItem('note');

    if (notes == null) {
        noteobj = []
    } else {
        noteobj = JSON.parse(notes);
    }
    let Html = ""
    noteobj.forEach((element, index) => {
        Html += `<tr>
       <th scope="row" >${index + 1}</th>
       <td id="textRow"><p class="m-0">${element[0]}</p></td>
       <td><p class="m-0">${element[1]}</p></td>
       <td><p class="m-0">${element[2]}</p></td>
       <td><button type="button" id="${index}" onclick="{Delete(this.id)}" class="btn btn-sm btn-outline-danger">Delete</button></td>
    </tr>`;
    })
    document.getElementById('tableBody').innerHTML = Html;
}
function Delete(id) {
    let notes = localStorage.getItem('note');
    if (notes == null) {
        noteobj = []
    } else {
        noteobj = JSON.parse(notes);
    }
    noteobj.splice(id, 1)
    localStorage.setItem('note', JSON.stringify(noteobj));
    addList()
}
let inputsec = document.getElementById('myInput')
inputsec.addEventListener('input', () => {
    let filter = inputsec.value.toUpperCase();
    let table = document.getElementById("myTable");
    let tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            let txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
});































