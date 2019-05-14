window.addEventListener("load", Init);

function Init() {
    requestPersons(1);
}

function showPersons(data, pageNum) {
    console.log(data);
    let tBody = document.querySelector(".persons");
    tBody.innerHTML = '';
    for (let i = 0; i < data.results.length; i++) {
        let tr = document.createElement('tr');
        let tdName = document.createElement('td');
        tdName.innerText = data.results[i].name;
        tr.appendChild(tdName);
        let tdHeight = document.createElement('td');
        tdHeight.innerText = data.results[i].height;
        tr.appendChild(tdHeight);
        let tdEye_color = document.createElement('td');
        tdEye_color.innerText = data.results[i].eye_color;
        tr.appendChild(tdEye_color);
        let tdSkin_color = document.createElement('td');
        tdSkin_color.innerText = data.results[i].skin_color;
        tr.appendChild(tdSkin_color);
        let tdBirth_year = document.createElement('td');
        tdBirth_year.innerText = data.results[i].birth_year;
        tr.appendChild(tdBirth_year);
        tBody.appendChild(tr);
    }
    makePagination(Math.ceil(data.count/10), pageNum);
}

function makePagination(num, current) {
    let pagination = document.querySelector('.pages');
    pagination.innerHTML = '';
    let nav = document.createElement('nav');
    let ul = document.createElement('ul');
    ul.classList.add('pagination');
    for (let i = 1; i<=num; i++) {
        let li = document.createElement('li');
        li.classList.add('page-item');
        if (i === current) {
            li.classList.add('active');
        }
        let a = document.createElement('a');
        a.classList.add('page-link');
        let urlAttr = document.createAttribute('href');
        urlAttr.value = `javascript:requestPersons(${i})`;
        a.setAttributeNode(urlAttr);
        a.innerText = i;
        li.appendChild(a);
        ul.appendChild(li);
    }
    nav.appendChild(ul);
    pagination.appendChild(nav);
}

function requestPersons(pageNum) {
    showLoader();
    let url = `https://swapi.co/api/people/?page=${pageNum}`;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            let errStatus = xhr.status;
            let errText = xhr.statusText;
            //console.log(errStatus + ": " + errText);
        } else {
            let data = JSON.parse(xhr.responseText);
            //console.log(data);
            showPersons(data, pageNum);
        }
    };
}

function showLoader() {
    let tBody = document.querySelector(".persons");
    tBody.innerHTML = '';
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    let colspan = document.createAttribute('colspan');
    colspan.value = 5;
    td.setAttributeNode(colspan);
    td.classList.add('text-center');
    let div = document.createElement('div');
    div.classList.add('spinner-border');
    div.classList.add('text-success');
    let role = document.createAttribute('role');
    role.value = 'status';
    div.setAttributeNode(role);
    let span = document.createElement('span');
    span.classList.add('sr-only');
    span.innerText = 'Loading...';
    div.appendChild(span);
    td.appendChild(div);
    tr.appendChild(td);
    tBody.appendChild(tr);
}