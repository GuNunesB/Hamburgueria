/**
 * Processo do Banco de Dados
 */

const { conectar, desconectar } = require('./database.js')
const lancheModel = require('./src/models/Lanches.js')
const stringSimilarity = require('string-similarity')

// Create
const criarLanche = async (nomeLanche, descricaoLanche, precoLanche, imagemLanche) => {
    try {
        // anotar cod de erro para alterar a mensagem de erro
        const novoLanche = new lancheModel(
            {
                nomeLanche: nomeLanche,
                descricaoLanche: descricaoLanche,
                precoLanche: precoLanche,
                imagemLanche: imagemLanche
            }
        )
            await novoLanche.save()
            console.log("Novo lanche adicionado!")
        
    } catch (error) {
        console.log(error)
    }
}

// Read
const listarLanches = async () => {
    try {
        const lanches = await lancheModel.find().sort(
            {
                nomeLanche: 1
            }
        )
        console.log(lanches)
    } catch (error) {
        console.log(error)
    }
}

// Read
const buscarLanche = async (nome) => {
    try {
        const lanche = await lancheModel.find(
            {
                nomeLanche: new RegExp(nome, 'i')
            }
        )
        // Cálculo de similaridade
        const nomesLanches = lanche.map(lanche => lanche.nomeLanche)
        if (nomesLanches.length === 0) {
            console.log("Lanche não encontrado")
        } else {
            const match = stringSimilarity.findBestMatch(nome, nomesLanches)

            const melhorLanche = lanche.find(lanche => lanche.nomeLanche === match.bestMatch.target)
            const lancheFormatado = {
                nomeLanche: melhorLanche.nomeLanche,
                descricaoLanche: melhorLanche.descricaoLanche,
                precoLanche: melhorLanche.precoLanche,
                imagemLanche: melhorLanche.imagemLanche
            }
            console.log(`- Nome: ${melhorLanche.nomeLanche}`)
            console.log(`- Descrição: ${melhorLanche.descricaoLanche}`)
            console.log(`- Preço: ${melhorLanche.precoLanche}`)
            console.log(`- img: ${melhorLanche.imagemLanche}`)
        }
    } catch (error) {
        console.log(error)
    }
}
// UPDATE
const atualizarLanche = async (id, nomeLan, descLan, precoLan, imgLan) => {
    try {
        const lanche = await lancheModel.findByIdAndUpdate(
            id,
            {
                nomeLanche: nomeLan,
                descricaoLanche: descLan,
                precoLanche: precoLan,
                imagemLanche: imgLan
            },
            {
                new: true,
                runValidators: true
            }
        )
        if (!lanche) {
            console.log("Lanche não encontrado")
        } else {
            console.log("Dados alterados com sucesso")
        }
    } catch (error) {
        console.log(error)
    }
}

// DELETE
const deletarLanche = async (id) => {
    try {
        const lanche = await lancheModel.findByIdAndDelete(id)

        if (!lanche) {
            console.log("Lanche não encontrado")
        } else {
            console.log("Exclusão concluida")
        }
    } catch (error) {
        console.log(error)
    }
}

// execução
const app = async () => {

    await conectar()

    /** CREATE - Cadastra novos lanches
    * await criarLanche("X-burguer", "O clássico hambúrguer é feito com um pão macio, uma suculenta carne de hambúrguer grelhada, queijo derretido (geralmente cheddar), alface, tomate e maionese. Simples, mas delicioso!", "19,99", "./img/x-burguer.jpg")
    * await criarLanche("Cheeseburger", "Uma variação do hambúrguer clássico, o cheeseburger traz uma fatia generosa de queijo derretido (geralmente cheddar ou mussarela), acompanhando a carne grelhada e os vegetais, como alface, tomate e cebola. O queijo derretido é o toque especial.", "21,99", "./img/Cheeseburguer.png")
    * await criarLanche("X-Bacon", "Para os fãs de bacon, esse hambúrguer é perfeito. Ele é composto por carne grelhada, queijo cheddar ou mussarela, cebola caramelizada, alface, tomate e várias fatias de bacon crocante. O sabor defumado do bacon dá um toque único.", "24,99", "./img/x-bacon.jpg")
    * await criarLanche("X-Egg", "Uma opção saborosa e completa, o hambúrguer com ovo leva a carne grelhada, queijo, alface, tomate e, o diferencial: um ovo frito ou mexido. O ovo traz uma cremosidade que combina muito bem com a carne suculenta.", "23,99", "./img/x-egg.jpg")
    * await criarLanche("X-Vegano", "Para quem segue uma dieta vegana ou quer algo mais leve, o hambúrguer vegano é feito com carne vegetal (geralmente à base de soja, feijão ou grão-de-bico), alface, tomate, pepino, molho vegano e pão sem leite ou ovos. Uma alternativa deliciosa e cheia de sabor.", "24,99", "./img/x-vegano.jpg")
    * await criarLanche("X-BBQ", "Este hambúrguer é uma combinação de carne grelhada com um molho barbecue saboroso. Ele é geralmente servido com queijo cheddar, cebola roxa, alface e tomate, criando um equilíbrio perfeito entre o doce do molho barbecue e o sabor da carne.", "29,99", "./img/x-bbq.webp")
    * await criarLanche("X-Chicken", "Para quem prefere frango, esse hambúrguer é feito com um peito de frango grelhado ou empanado. Pode ser servido com queijo, alface, tomate, maionese ou até molho especial. É uma alternativa mais leve e igualmente saborosa.", "22,99", "./img/x-chicken.jpeg")
    * await criarLanche("X-Costela", "Um hambúrguer diferenciado, com carne de costela desfiada ou moída, misturada com temperos especiais. Ele pode ser servido com cebolas caramelizadas, queijo derretido, alface e molho barbecue, criando uma experiência deliciosa de sabor.", "34,99", "./img/x-costela.jpg")
    * await criarLanche("DoubleCheeseburger", "Para os amantes de queijo e carne, o double cheeseburger traz duas carnes de hambúrguer suculentas e duas fatias de queijo derretido, além dos tradicionais acompanhamentos como alface, tomate e maionese. Uma opção cheia de sabor e calorias!", "29,99", "./img/double-cheeseburguer.jfif")
    */

    /** READ - Essas funções listam todos os lanches, e busca um em expecífico respectivamente
     * await listarLanches()
     * await buscarLanche("x-Costela")
    */
    
    /** UPDATE - Altera as informações do cadastro de um lanche
     * await atualizarLanche('67c23b643fdd382f6b7a1a22', "X-Egg", "Uma opção saborosa e completa, o hambúrguer com ovo leva a carne grelhada, queijo, alface, tomate e, o diferencial: um ovo frito.", "25,99", "./img/x-egg.jpg")
    */ 

    /** DELETE - Exclui o cadastro de um lanche
     * await deletarLanche('67c23b643fdd382f6b7a1a26')
    */
    
    await desconectar()
    
}

console.clear()
app()