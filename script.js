const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//
function toggleButton(){
    button.disabled = !button.disabled;
}

//Passing Joke to VoiceRSS API
function setJokeAudio(Joke){
    VoiceRSS.speech({
        key: 'f70782c35bf246049daf7c93bc9bc545',
        src: Joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
    
}

//Get joke from Joke Api
async function getJoke(){
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist'
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        }
        else{
            joke = data.joke;
        }
        // Text-To-Speech
        setJokeAudio(joke);
        // Disabled button
        button.disabled = true;
    } catch (error) {
        console.log('f etch failed', error);
    }
}

// Event Listerners
button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);
