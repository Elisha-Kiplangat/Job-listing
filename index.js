const filtersSelected = new Set();
const filters = document.querySelector('.filter-cover');
const clear = document.querySelector('.clear');

const bgImg = document.getElementById('bg-img');

if(window.innerWidth <= 540 ) {
    let bg = bgImg.src.split('/') ;
    console.log(bg , bg.length );
    bg[bg.length-1] = 'bg-header-mobile.svg' ;
    bgImg.src = bg.join('/');
}


const filterParent = filters.parentElement;

let data, main = document.querySelector('main'), realJobList = [];

fetch('data.json')
    .then(data => data.json())
    .then(res => {
        data = res;
        createList(data);
    });

function createList(data) {

    // filterParent.classList.add('none');

    let docf = document.createDocumentFragment();
    data.forEach(el => {
        let listing = document.createElement('div');
        listing.classList.add('listing');

        let listFrag = document.createDocumentFragment();
        listing.companyName = el.company
        listing.data_filters = new Set([...el.languages, ...el.tools, el.role, el.level]);
        listing.data_filters.forEach(l => {
            let li = document.createElement('li');
            li.classList.add('job-filter');
            li.textContent = l;
            li.setAttribute('data-filter', l);
            listFrag.appendChild(li);
        })

        listing.innerHTML = `
        <div class="left">
            <div class="listing-img">
                <img src="${el.logo}" alt="">
            </div>
            <div class="company-details">
                <div class="company-nametags">
                    <h4 class="company-name">${el.company}</h4>
                    <div class="company-tags">
                        <p class="company-tag-new" style="display:${ el.new ? "block" : 'none'}" >NEW</p>
                        <p class="company-tag-ftrd" style="display:${ el.featured ? "block" : 'none'}" >FEATURED</p>
                    </div>
                </div>
                <h2 class="job-role">${el.position}</h2>
                <div class="job-min-details">
                    <p class="job-time">${el.postedAt}</p>
                    <p class="contOrFull">${el.contract}</p>
                    <p class="job-location">${el.location}</p>
                </div>
            </div>
        </div>
        <ul class="job-filters">
        </ul>
        ` ;

        listing.querySelector('.job-filters').append(listFrag);
        realJobList.push(listing);
        docf.append(listing);
    });
    main.append(docf);

    const filterBtns = document.querySelectorAll('.job-filters > .job-filter');

    filterBtns.forEach(el => {
        el.addEventListener('click', ev => {
            addFilter(el.dataset.filter);
        })
    })
}