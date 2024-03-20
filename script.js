document.addEventListener('DOMContentLoaded', (event) => {
    const articles = {
        'Article 1': { text: 'Porte en bois', dimensions: ['Hauteur (mm)', 'Largeur (mm)', 'Epaisseur (mm)'] },
        'Article 2': { text: 'Étagère en bois', dimensions: ['Largeur (mm)', 'Profondeur (mm)', 'Epaisseur (mm)'] },
        'Article 3': { text: 'Meuble en bois intérieur et extérieur', dimensions: ['Hauteur (mm)', 'Largeur (mm)', 'Profondeur (mm)'] }
    };
    const bois = {
        'Bois 1': 120.00,
        'Bois 2': 110.00,
        'Bois 3': 75.00,
        'Bois 4': 80.00,
        'Bois 5': 90.00
    };

    const typeArticleSelect = document.getElementById('type-article');
    const boisSelect = document.getElementById('bois');
    const dimensionsLabels = [
        document.querySelector('label[for="dimension1"]'),
        document.querySelector('label[for="dimension2"]'),
        document.querySelector('label[for="dimension3"]')
    ];
    const dimensionInputs = [
        document.getElementById('dimension1'),
        document.getElementById('dimension2'),
        document.getElementById('dimension3')
    ];

    Object.keys(articles).forEach(key => {
        let option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        typeArticleSelect.appendChild(option);
    });

    Object.keys(bois).forEach(key => {
        let option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        boisSelect.appendChild(option);
    });

    function updateDimensionLabels(articleKey) {
        articles[articleKey].dimensions.forEach((dimension, index) => {
            dimensionsLabels[index].textContent = dimension + ' :';
        });
    }

    function enforceInteger(event) {
        if (
            (event.keyCode >= 48 && event.keyCode <= 57) ||
            (event.keyCode >= 96 && event.keyCode <= 105) ||
            event.keyCode === 8 || event.keyCode === 9 || event.keyCode === 13 ||
            event.keyCode === 46 || (event.keyCode >= 37 && event.keyCode <= 40)
        ) {
        } else {
            event.preventDefault();
        }
    }
    dimensionInputs.forEach(input => {
        input.addEventListener('keydown', enforceInteger);
    });
    

function calculateAndDisplayResults() {
    const selectedArticle = typeArticleSelect.options[typeArticleSelect.selectedIndex].text;
    const selectedBois = boisSelect.options[boisSelect.selectedIndex].text;
    const dimension1 = parseFloat(document.getElementById('dimension1').value) || 0;
    const dimension2 = parseFloat(document.getElementById('dimension2').value) || 0;
    const dimension3 = parseFloat(document.getElementById('dimension3').value) || 0;

    const selectedArticleKey = typeArticleSelect.value;
    updateDimensionLabels(selectedArticleKey);

    let prix;
    let quantiteBoisM2;

    const d1 = dimension1 / 1000;
    const d2 = dimension2 / 1000;
    const d3 = dimension3 / 1000;

    if (selectedArticle === 'Article 1') {
        quantiteBoisM2 = d1 * d2;
        prix = quantiteBoisM2 * bois[selectedBois];

    } else if (selectedArticle === 'Article 2') {
        quantiteBoisM2 = d1 * d2;
        prix = quantiteBoisM2 * bois[selectedBois];

    } else if (selectedArticle === 'Article 3') {
        quantiteBoisM2 = d1 * d2 * d3 * 2;
        prix = quantiteBoisM2 * bois[selectedBois] * 2;

        if (d2 >= 1) { 
            quantiteBoisM2 = d1 * d2 * d3 * 3;
            prix = quantiteBoisM2 * bois[selectedBois] * 3;
        }
    }
    document.getElementById('output-quantite').textContent = `QUANTITÉ BOIS : ${quantiteBoisM2.toFixed(2)} m²`;
    document.getElementById('output-prix').textContent = `PRIX : ${prix.toFixed(2)} €`;

    if (selectedArticle === 'Article 3') {
        document.getElementById('output-texte').innerHTML = `Meuble en bois intérieur : ${selectedBois} et extérieur : ${selectedBois}<br>Dimensions : ${dimension1}mm x ${dimension2}mm x ${dimension3}mm`;
    } else {
        document.getElementById('output-texte').innerHTML = `${articles[selectedArticle].text} : ${selectedBois}<br>Dimensions : ${dimension1}mm x ${dimension2}mm x ${dimension3}mm`;
    }
    document.getElementById('nom-article').textContent = articles[selectedArticle].text;
    
    
    
}

    typeArticleSelect.addEventListener('change', calculateAndDisplayResults);
    boisSelect.addEventListener('change', calculateAndDisplayResults);
    dimensionInputs.forEach(input => input.addEventListener('input', calculateAndDisplayResults));

    updateDimensionLabels(typeArticleSelect.value);
    calculateAndDisplayResults();
});