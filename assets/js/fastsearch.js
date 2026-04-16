import * as params from '@params';

let fuse;
let resList = document.getElementById('searchResults');
let sInput = document.getElementById('searchInput');
let resultsCount = document.getElementById('searchResultsCount');
let first, last, current_elem = null;
let resultsAvailable = false;

window.onload = function () {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                if (data) {
                    let options = {
                        distance: 100,
                        threshold: 0.4,
                        ignoreLocation: true,
                        keys: ['title', 'permalink', 'summary', 'content', 'autori', 'genere']
                    };
                    if (params.fuseOpts) {
                        options = {
                            isCaseSensitive: params.fuseOpts.iscasesensitive ?? false,
                            includeScore: params.fuseOpts.includescore ?? false,
                            includeMatches: params.fuseOpts.includematches ?? false,
                            minMatchCharLength: params.fuseOpts.minmatchcharlength ?? 1,
                            shouldSort: params.fuseOpts.shouldsort ?? true,
                            findAllMatches: params.fuseOpts.findallmatches ?? false,
                            keys: params.fuseOpts.keys ?? ['title', 'permalink', 'summary', 'content', 'autori', 'genere'],
                            location: params.fuseOpts.location ?? 0,
                            threshold: params.fuseOpts.threshold ?? 0.4,
                            distance: params.fuseOpts.distance ?? 100,
                            ignoreLocation: params.fuseOpts.ignorelocation ?? true
                        }
                    }
                    fuse = new Fuse(data, options);
                }
            } else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.open('GET', "../index.json");
    xhr.send();
}

function difficultyClass(livello) {
    if (!livello) return '';
    return 'difficulty-' + livello.toLowerCase().replace(/ /g, '-');
}

function buildResultHTML(item) {
    const title     = item.title     || '';
    const permalink = item.permalink || '#';
    const autori    = item.autori    || '';
    const livello   = item.livello   || '';
    const genere    = item.genere    || '';

    let badges = '';
    if (autori)  badges += `<span class="entry-pill">${autori}</span>`;
    if (livello) badges += `<span class="entry-pill entry-pill-difficulty ${difficultyClass(livello)}">${livello}</span>`;
    if (genere)  badges += `<span class="entry-pill">${genere}</span>`;

    const badgesHTML = badges
        ? `<div class="entry-taxonomies search-result-badges">${badges}</div>`
        : '';

    return `<li class="post-entry search-result-entry">
        <header class="entry-header search-result-title">${title}</header>
        ${badgesHTML}
        <a href="${permalink}" aria-label="${title}"></a>
    </li>`;
}

function activeToggle(ae) {
    document.querySelectorAll('.focus').forEach(el => el.classList.remove('focus'));
    if (ae) {
        ae.focus();
        document.activeElement = current_elem = ae;
        ae.parentElement.classList.add('focus');
    } else {
        document.activeElement.parentElement.classList.add('focus');
    }
}

function reset() {
    resultsAvailable = false;
    resList.innerHTML = sInput.value = '';
    if (resultsCount) resultsCount.textContent = '';
    sInput.focus();
}

function updateCount(n) {
    if (!resultsCount) return;
    if (n === 0) {
        resultsCount.textContent = 'Nessun risultato';
    } else {
        resultsCount.textContent = n === 1 ? '1 risultato' : `${n} risultati`;
    }
}

sInput.onkeyup = function (e) {
    if (!fuse) return;

    const query = this.value.trim();
    if (!query) {
        reset();
        return;
    }

    let results;
    if (params.fuseOpts) {
        results = fuse.search(query, { limit: params.fuseOpts.limit });
    } else {
        results = fuse.search(query);
    }

    if (results.length !== 0) {
        resList.innerHTML = results.map(r => buildResultHTML(r.item)).join('');
        resultsAvailable = true;
        first = resList.firstChild;
        last  = resList.lastChild;
        updateCount(results.length);
    } else {
        resultsAvailable = false;
        resList.innerHTML = '';
        updateCount(0);
    }
}

sInput.addEventListener('search', function (e) {
    if (!this.value) reset();
});

document.onkeydown = function (e) {
    let key = e.key;
    let ae  = document.activeElement;
    let inbox = document.getElementById('searchbox').contains(ae);

    if (ae === sInput) {
        let elements = document.getElementsByClassName('focus');
        while (elements.length > 0) elements[0].classList.remove('focus');
    } else if (current_elem) {
        ae = current_elem;
    }

    if (key === 'Escape') {
        reset();
    } else if (!resultsAvailable || !inbox) {
        return;
    } else if (key === 'ArrowDown') {
        e.preventDefault();
        if (ae === sInput) {
            activeToggle(resList.firstChild.lastChild);
        } else if (ae.parentElement !== last) {
            activeToggle(ae.parentElement.nextSibling.lastChild);
        }
    } else if (key === 'ArrowUp') {
        e.preventDefault();
        if (ae.parentElement === first) {
            activeToggle(sInput);
        } else if (ae !== sInput) {
            activeToggle(ae.parentElement.previousSibling.lastChild);
        }
    } else if (key === 'ArrowRight') {
        ae.click();
    }
};
