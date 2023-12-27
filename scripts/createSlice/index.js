const createTemplate = require('./templates/createTemplate');

const layer = process.argv[2];
const sliceName = process.argv[3];

const layers = ['features', 'entities', 'pages'];

if (!layer || !layers.includes(layer)) {
    throw new Error(`Визначте слой ${layers.join(' чи ')}`);
}

if (!sliceName) {
    throw new Error('Визначте слайс');
}

createTemplate(layer, sliceName);
