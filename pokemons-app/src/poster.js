const el = document.getElementById('poster');
const height = el.clientHeight;
const width = el.clientWidth;

el.addEventListener('mousemove', (event) => {
    const { layerX, layerY } = evt;
    const yRotation = ((layerX - width / 2) / width) * 20;
    const xRotation = ((layerY - height / 2) / height) * 20;

    const string = ` perspective(500px)
                 scale(1.1)
                 rotateX(${xRotation}deg)
                 rotateY(${yRotation}deg)
               `;
    el.style.transform = string;
});

el.addEventListener('mouseout', () => {

    const string = ` perspective(500px)
                scale(1)
                rotateX(0)
                rotateY(0)
              `;
    el.style.transform = string;
});