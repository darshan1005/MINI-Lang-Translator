let container = document.querySelector('.container');
let fromInput = document.querySelector('.container .select-box .from-input-box input');
let toInput = document.querySelector('.container .select-box .to-input-box input');
let switchBtn = document.querySelector('.container .select-box .switch-btn');
let fromOptionsBox = document.querySelector('.container .from-options');
let toOptionsBox = document.querySelector('.container .to-options');
let fromInputBox = document.querySelector('.container .select-box .from-input-box');
let toInputBox = document.querySelector('.container .select-box .to-input-box');
let FromTranslateInput = document.querySelector('.from-text-box textarea');
let ToTranslateInput = document.querySelector('.to-text-box textarea');
let fromCopyBtn = document.querySelector('.from-text-box .btns .copy-btn');
let toCopyBtn = document.querySelector('.to-text-box .btns .copy-btn');

let currentFrom, currentTo, currentFromTranslation, currentToTranslation;

let getCountries = () => {
    let fromLi = '';
    let toLi = '';
    for (let countryCode in countries) {
        fromLi += `<li onclick="setFromCountries('${countryCode}')">${countries[countryCode]}</li>`;
        toLi += `<li onclick="setToCountries('${countryCode}')">${countries[countryCode]}</li>`;
    }

    fromOptionsBox.innerHTML = fromLi;
    toOptionsBox.innerHTML = toLi;
};

let setFromCountries = (countryCode) => {
    fromInput.value = countryCode;
    fromOptionsBox.classList.remove('from-options-active');
};

let setToCountries = (countryCode) => {
    toInput.value = countryCode;
    toOptionsBox.classList.remove('to-options-active');
};

fromInputBox.addEventListener('click', () => {
    fromOptionsBox.classList.toggle('from-options-active');
    toOptionsBox.classList.remove('to-options-active');
    getTranslation();
});

toInputBox.addEventListener('click', () => {
    fromOptionsBox.classList.remove('from-options-active');
    toOptionsBox.classList.toggle('to-options-active');
    getTranslation();
});

switchBtn.addEventListener('click', () => {
    currentFrom = fromInput.value;
    currentTo = toInput.value;
    fromInput.value = currentTo;
    toInput.value = currentFrom;
    currentFromTranslation = FromTranslateInput.value;
    currentToTranslation = ToTranslateInput.value;
    FromTranslateInput.value = currentToTranslation;
    ToTranslateInput.value = currentFromTranslation;
    getTranslation();
});

let getTranslation = () => {
    let text = FromTranslateInput.value;
    let from = fromInput.value;
    let to = toInput.value;

    if (text !== '' && from && to){
        let url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                ToTranslateInput.value = data.responseData.translatedText;
            })
            .catch(error => {
                console.log(`Error occurred with translation: ${error}`);
                ToTranslateInput.value.innerHTML = "Error";
            });
    }else{
        ToTranslateInput.value.innerHTML = "INVALID TRANSLATION REQUEST"
    }
    
};

FromTranslateInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && FromTranslateInput.value !== '') {
        getTranslation();
    }
});

let copyFromText = () => {
    if (FromTranslateInput.value !== '') {
        navigator.clipboard.writeText(FromTranslateInput.value);
    }
};

let copyToText = () => {
    if (ToTranslateInput.value !== '') {
        navigator.clipboard.writeText(ToTranslateInput.value);
    }
};

let speakFromText = () => {
    if (FromTranslateInput.value !== '') {
        let speech = new SpeechSynthesisUtterance();
        let fromLangCode = fromInput.value;
        speech.lang = fromLangCode || 'en-US';
        speech.text = FromTranslateInput.value;
        speechSynthesis.speak(speech);
    }
};

let speakToText = () => {
    if (ToTranslateInput.value !== '') {
        let speech = new SpeechSynthesisUtterance();
        let toLangCode = toInput.value;
        speech.lang = toLangCode || 'en-US';
        speech.text = ToTranslateInput.value;
        speechSynthesis.speak(speech);
    }
};

getCountries();
