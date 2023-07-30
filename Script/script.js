const endPoint = "http://127.0.0.1/list";
const maincont = document.getElementById('myModal');

window.addEventListener("load", async () => {
    fetch(endPoint)
    .then((response) => response.json())
    .then((data) => {
        // Now data has the needed data
        // console.log(data);
        data.forEach(element => {
            maincont.insertAdjacentHTML('afterend',`
            <div id="submaincont${element.directory}" class="subcontain">
            <span class="h1" id="tripHead">${element.directory}</span>
            <div id="imgcont" class="imgcont"></div>
            </div>
            `)
            element.images.forEach(imgelement =>{
                    const imgContainer = document.querySelector('.imgcont');
                    imgContainer.innerHTML += `
                        <img src="./Data/${element.directory}/${imgelement}" alt="image" class="box1" id="${element.directory}/${imgelement}" onclick="zoom(this.id)">
                    `;

                })
            });
        })
        .catch((err) => console.log(err));
});