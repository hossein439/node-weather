const weatherForm = document.querySelector('form');
const msgOne = document.querySelector('#msg-1');
const msgTwo = document.querySelector('#msg-2');

weatherForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const search = e.target.elements[0];
    const location = search.value;
    msgOne.textContent = 'Loading ...';
    msgTwo.textContent = ''
    fetch(`http://localhost:3000/weather?address=${location}`).then((res)=>{
        res.json().then((data)=>{
            if(data.err) {
                msgOne.textContent = data.err;
            } else {
                msgOne.textContent = data['place name'];
                msgTwo.textContent = data.forecast;
            }
        })
    })
});
