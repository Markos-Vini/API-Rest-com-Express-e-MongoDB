import livros from "../models/Livro.js";

class LivroControllers {

            // METODO PARA PEGAR OS LIVROS
    static listarLivros = (req, res) => {
        livros.find()
            .populate('autor')
            .populate('editora')
            .exec((err,livros) => {
                res.status(200).json(livros)
        })
    }

            // METODO PARA PEGAR O LIVRO PELO ID
    static listarLivroPorId = (req, res) => {
        const id = req.params.id

        livros.findById(id)
            .populate('autor', 'nome')
            .populate('editora', 'nomeEditora')
            .exec((err, livros) => {
            if(err) {
                res.status(400).send({message: `${err.message} - Id do livro não localizado.`})
            } else {
                res.status(200).send(livros)
            }
        })
    }

            // METODO PARA CADASTRAR LIVRO
    static cadastrarLivro = (req, res) => {
        let livro = new livros(req.body)

        livro.save((err) => {

            if(err) {
                res.status(500).send({message: `${err.message} - falha ao cadastrar livro.`})
            } else {
                res.status(201).send(livro.toJSON())
            }
        })
    }

           // METODO PARA ATUALIZAR LIVRO
    static atualizarLivro = (req, res) => {
        const id = req.params.id

        livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err) {
                res.status(200).send({message: 'Livro atualizado com sucesso'})
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }

           // METODO PARA EXCLUIR LIVRO
    static excluirLivro = (req,res) => {
        const id = req.params.id

        livros.findByIdAndDelete(id, (err) => {
            if(!err) {
                res.status(200).send({message: 'Livro removido com sucesso.'})
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }

           // METODO PARA LISTAR TODOS OS LIVROS POR EDITORA
    static listarLivroPorEditora = (req, res) => {
        const editora = req.query.editora

        livros.find({'editora': editora}, {}, (err, livros) => {
            res.status(200).send(livros)
        })
    }

}

export default LivroControllers;