import editoras from "../models/Editora.js";

class EditoraControllers {

    // METODO PARA PEGAR AS EDITORAS
    static listarEditoras = (req, res) => {
        editoras.find((err, editoras) => {
            res.status(200).json(editoras)
        })
    }

    // METODO PARA PEGAR A EDITORA PELO ID
    static listarEditoraPorId = (req, res) => {
        const id = req.params.id

        editoras.findById(id, (err, editora) => {
            if(err) {
                res.status(400).send({message: `${err.message} - Id da editora não localizado.`})
            } else {
                res.status(200).send(editora)
            }
        })
    }

    // METODO PARA CADASTRAR EDITORA
    static cadastrarEditora = (req, res) => {
        let editora = new editoras(req.body)

        editora.save((err) => {

            if(err) {
                res.status(500).send({message: `${err.message} - falha ao cadastrar editora.`})
            } else {
                res.status(201).send(editora.toJSON())
            }
        })
    }

    // METODO PARA ATUALIZAR EDITORA
    static atualizarEditora = (req, res) => {
        const id = req.params.id

        editoras.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err) {
                res.status(200).send({message: 'Editora atualizada com sucesso'})
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }

    // METODO PARA EXCLUIR EDITORA
    static excluirEditora = (req,res) => {
        const id = req.params.id

        editoras.findByIdAndDelete(id, (err) => {
            if(!err) {
                res.status(200).send({message: 'Editora removido com sucesso.'})
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }

}

export default EditoraControllers;