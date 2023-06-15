const searchItem = document.getElementById('search');
const searchButton = document.getElementById('search_button');
const responseWrapper = document.getElementById('response_wrapper');

searchButton.addEventListener('click', (e) => {
            let searchWord = searchItem.value;
            e.preventDefault();
            const options = {
            method: 'POST',
            headers: {
                  'content-type': 'application/json',
                  'X-RapidAPI-Key': '89efa75446msh7f1e020edea3981p1bf148jsn42ea39c5d170',
                  'X-RapidAPI-Host': 'jspell-checker.p.rapidapi.com'
            },
            body: `{"language":"enUS","fieldvalues":"${searchWord}","config":{"forceUpperCase":false,"ignoreIrregularCaps":false,"ignoreFirstCaps":true,"ignoreNumbers":true,"ignoreUpper":false,"ignoreDouble":false,"ignoreWordsWithNumbers":true}}`
      };

      fetch('https://jspell-checker.p.rapidapi.com/check', options)
            .then(data => data.json())
            .then(data => {
                  let data2 = data['elements'][0]['errors'];
                  console.log(data2)
                  let infoErorrs = document.createElement('div');
                  let numErrors = document.createElement('span');
                  numErrors.innerText = `Amount of mistakes: ${data2.length}`;
                  responseWrapper.appendChild(numErrors);
                  for (let i = 0; i < data2.length; i++) {
                        let a = [data2[i].word];
                        let b = [data2[i]['suggestions']];
                        let errorWord = document.createElement('span');
                        errorWord.innerText = `Typo: ${a.join(' ')}`;
                        let varSpelling = document.createElement('p');
                        varSpelling.innerText = `Spelling variants: ${b.join(', ')}`;

                        infoErorrs.appendChild(errorWord);
                        infoErorrs.appendChild(varSpelling);
                        responseWrapper.appendChild(infoErorrs);
                  };
            })
      });