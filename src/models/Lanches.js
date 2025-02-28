/**
 * Tabela Lanches
 */

const { model, Schema } = require('mongoose')

// Criação da estrutura de dados
const lancheSchema = new Schema({
    nomeLanche: {
        type: String
    },
    descricaoLanche: {
        type: String
    },
    precoLanche: {
        type: String
    },
    imagemLanche: {
        type: String
    }
}, {versionKey: false})

//importação do modelo de dados
//obs: Clientes será o nome da coleção (mongodb-> clientes)
module.exports = model('Lanche', lancheSchema)