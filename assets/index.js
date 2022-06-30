const wrapper = document.querySelector(".wrapper");
searchInput = wrapper.querySelector("input");
synonyms = wrapper.querySelector(".synonym .list");
volume = wrapper.querySelector(".word i");
removeIcon = wrapper.querySelector(".search span");
infoText = wrapper.querySelector(".info-text");
let audio;

//const search = word

// word with meaning vs word without a meaning
const dataProcessing = (result, word) => {
  if(result.title) {
      infoText.innerHTML = "The word: ${word} cannot be found!";
  } else {
      wrapper.classList.add("active");

      let definitions = result[0].meanings[0].definitions[0];
      phonetics = `Commonly pronounced as: ${result[0].phonetics[0].text}`;
      synonym = result[0].meanings[0].definitions[0].synonyms[0];

      document.querySelector(".word p").innerText = result[0].word;
      document.querySelector(".word span").innerText = phonetics;
      document.querySelector(".meaning span").innerText = definitions.definition;
      document.querySelector(".example span").innerText = definitions.example ?? `No example`;
      document.querySelector(".synonym span").innerText = definitions.example ?? `No synonym`;
  }
}

// fetch api function
/*function fetchApi(word) {
  infoText.style.color = "#000";
  wrapper.classList.remove("active");
  infoText.innerHTML = `<span> Searching for the meaning of: "${word}"</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => data(result, word));
}*/ 

const queryAPI = word => {
  infoText.style.color = "white";
  wrapper.classList.remove("active");
  infoText.innerHTML = `<span> Searching for the meaning of "${word}"</span>`;
  axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  //let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  //fetch(url)
  .then(res => dataProcessing(res.data, word))
  .catch(err => console.log(err));
} 

//when you press enter, and there is word(target), parse the word into the query
searchInput.addEventListener("keyup", (e) => {
  if(e.key === "Enter" && e.target.value) {
      queryAPI(e.target.value)
  }
})

// to clear
removeIcon.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  wrapper.classList.remove("active");
  infoText.style.color = "black";
  infoText.innerHTML = "Type an existing word and press enter to get meaning, example, synonyms, etc.";
})
