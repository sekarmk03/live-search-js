// list data awal
let dataMhs = [
    {
        nim : "2007703",
        nama : "Sekar Madu Kusumawardani",
        email : "sekarmadu99@gmail.com",
        jenisKelamin : "Perempuan",
        angkatan : 2020
    },
    {
        nim : "2004191",
        nama : "Muhammad Azar Nuzy",
        email : "azarnuzy@gmail.com",
        jenisKelamin : "Laki-laki",
        angkatan : 2020
    },
    {
        nim : "2001789",
        nama : "Rahma Maulida",
        email : "rahmamaulida@gmail.com",
        jenisKelamin : "Perempuan",
        angkatan : 2020
    },
    {
        nim : "2009123",
        nama : "Muhammad Aditya Hasta P",
        email : "madityahasta@gmail.com",
        jenisKelamin : "Laki-laki",
        angkatan : 2020
    },
    {
        nim : "2002345",
        nama : "Silmi Aulia Rohmah",
        email : "silmiar@gmail.com",
        jenisKelamin : "Perempuan",
        angkatan : 2020
    },
    {
        nim : "2003456",
        nama : "Axel Eldrian",
        email : "eldrianaxel@gmail.com",
        jenisKelamin : "Laki-laki",
        angkatan : 2020
    }
];

// tampilkan data awal
const table = document.getElementById("tblMhs");
for(let index = 0; index < dataMhs.length; index++){
    tampilData(dataMhs[index], index+1);
}

// fungsi hapus data
function deleteMhs(e){
    let current = e.parentElement;
    let first = null;
    while(current){
        first = current;
        current = current.previousElementSibling;
    }
    for(let index = 0; index < dataMhs.length; index++){
        if(dataMhs[index].nim === first.textContent){
            dataMhs.splice(index, 1);
            break;
        }
    }
    const rows = document.getElementById("tblMhs").rows;
    for(let index = 1; index < rows.length; index++){
        if(rows[index].firstChild.textContent === first.textContent){
            document.getElementById("tblMhs").deleteRow(index);
            break;
        }
    }
}

// fungsi insert data
function insertData(){
    const newData = getNewData();
    dataMhs.push(newData);
    const table = document.getElementById("tblMhs").getElementsByTagName("tbody")[0];
    tampilData(newData, table.length);
    resetForm();
}

// fungsi mendapatkan nilai data baru sebagai objek
function getNewData(){
    let newData = {};
    newData['nim'] = document.getElementById("nim").value;
    newData['nama'] = document.getElementById("nama").value;
    newData['email'] = document.getElementById("email").value;
    let radioInput = document.getElementsByName("jenisKelamin");
    for(let i = 0; i < radioInput.length; i++){
        if(radioInput[i].checked){
            newData['jenisKelamin'] = radioInput[i].value;
        }
    }
    newData['angkatan'] = document.getElementById("angkatan").value;
    return newData;
}

// fungsi menampilkan data
function tampilData(theData, index){
    const row = table.insertRow(index);
    let i = 0;
    Object.values(theData).forEach(val => {
        const cell = row.insertCell(i);
        cell.innerHTML = val;
        i++;
    });
    const button = document.createElement("button");
    button.setAttribute("class", "btn btn-sm btn-danger");
    button.setAttribute("type", "button");
    button.setAttribute("onclick", "deleteMhs(this)");
    const ikon = document.createElement("i");
    ikon.setAttribute("class", "fas fa-trash-alt");
    button.appendChild(ikon);
    const deleted = row.insertCell(i);
    deleted.appendChild(button);
}

// fungsi mereset form
function resetForm(){
    document.getElementById("nim").value = "";
    document.getElementById("nama").value = "";
    document.getElementById("email").value = "";
    const checkedRadio = document.getElementsByName("jenisKelamin");
    for(let i = 0; i < checkedRadio.length; i++){
        checkedRadio[i].checked = false;
    }
    let defSelect = document.getElementById("defSelect");
    document.getElementById("angkatan").selectedIndex = defSelect;
}

// fungsi mencari data
function searchData(){
    const input = document.getElementById("search").value.toLowerCase();
    const table = document.getElementById("tblMhs");
    const rows = table.getElementsByTagName("tr");
    for(let i = 0; i < rows.length; i++){
        const cells = rows[i].getElementsByTagName("td")[1];
        if(cells){
            const cell = cells.textContent || cells.innerHTML;
            cell.toLowerCase().indexOf(input) > -1
            ? (rows[i].style.display = "table-row")
            : (rows[i].style.display = "none");
        }
    }
}
