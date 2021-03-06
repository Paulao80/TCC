import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Propriedade from '../models/Propriedade';
import {default as ProdutorClass} from '../models/Produtor';
import PropriedadeView from '../views/PropriedadeView';
import * as Yup from 'yup';

export default {
    async index(request: Request, response: Response){
        const {group} = request.query;

        const PropriedadesRepository = getRepository(Propriedade);

        switch(group) {
            case "Municipio":
                const municipios = await PropriedadesRepository
                .createQueryBuilder("P")
                .select(["P.Municipio AS Municipio", "COUNT(P.Municipio) AS QTD"])
                .groupBy("P.Municipio")
                .getRawMany();
                return response.json(municipios);
            case undefined: 
                const propriedades = await PropriedadesRepository.find({
                relations: [
                    'Produtor'
                ]
                 });
    
                return response.json(PropriedadeView.renderMany(propriedades));
            default: 
                 return response.json([]);
        }
    },
    async show(request: Request, response: Response){
        const {id} = request.params;

        const PropriedadesRepository = getRepository(Propriedade);

        const propriedade = await PropriedadesRepository.findOneOrFail(id, {
            relations: [
                'Produtor'
            ]
        });

        return response.json(PropriedadeView.render(propriedade));
    },
    async create(request: Request, response: Response){
        const {
            Nirf,
            Nome,
            InscEstadual,
            Endereco,
            Municipio,
            Estado,
            Produtor
        } = request.body;

        const data = {
            Nirf,
            Nome,
            InscEstadual,
            Endereco,
            Municipio,
            Estado,
            Produtor
        };

        const schema = Yup.object().shape({
            Nirf: Yup.string().required('NIRF ?? Obrigat??rio'),
            Nome: Yup.string().required('Nome ?? Obrigat??rio'),
            InscEstadual: Yup.string().required('Inscri????o Estadual ?? Obrigat??ria'),
            Endereco: Yup.string().required('Endere??o ?? Obrigat??rio'),
            Municipio: Yup.string().required('Munic??pio ?? Obrigat??rio'),
            Estado: Yup.string().required('Estado ?? Obrigat??rio'),
            Produtor: Yup.object().shape({
                ProdutorId: Yup.number().required('Produtor ?? Obrigat??rio'),
                Nome: Yup.string().notRequired(),
                DataNasc: Yup.date().notRequired(),
                TipoPessoa: Yup.number().notRequired(),
                Nacionalidade: Yup.string().notRequired(),
                CpfCnpj: Yup.string().notRequired(),
                RG: Yup.string().notRequired(),
                OrgaoExp: Yup.string().notRequired(),
                EstadoExp: Yup.string().notRequired(),
                DataExp: Yup.date().notRequired(),
                EstadoCivil: Yup.number().notRequired(),
                Telefone: Yup.string().notRequired(),
                UltLaticinio: Yup.string().notRequired()
            }).required('Produtor ?? Obrigat??rio')
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const ProdutoresRepository = getRepository(ProdutorClass);
        const PropriedadesRepository = getRepository(Propriedade);

        const produtor = await ProdutoresRepository.findOneOrFail(Produtor.ProdutorId);   
        
        data.Produtor = produtor;

        const propriedade = PropriedadesRepository.create(data);

        await PropriedadesRepository.save(propriedade);

        return response.status(201).json(propriedade);
    },
    async update(request: Request, response: Response){
        const {
            PropriedadeId,
            Nirf,
            Nome,
            InscEstadual,
            Endereco,
            Municipio,
            Estado    
        } = request.body;

        const data = {
            PropriedadeId,
            Nirf,
            Nome,
            InscEstadual,
            Endereco,
            Municipio,
            Estado            
        };

        const schema = Yup.object().shape({
            PropriedadeId: Yup.number().required('PropriedadeId ?? Obrigat??rio'),
            Nirf: Yup.string().required('Nirf ?? Obrigat??rio'),
            Nome: Yup.string().required('Nome ?? Obrigat??rio'),
            InscEstadual: Yup.string().required('InscEstadual ?? Obrigat??rio'),
            Endereco: Yup.string().required('Endereco ?? Obrigat??rio'),
            Municipio: Yup.string().required('Municipio ?? Obrigat??rio'),
            Estado: Yup.string().required('Estado ?? Obrigat??rio'),
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const PropriedadesRepository = getRepository(Propriedade);

        const find = await PropriedadesRepository.findOne(PropriedadeId);

        if(!find) return response.status(404).json({message: "Propriedade n??o encontrada"});

        const propriedade = PropriedadesRepository.create(data);

        await PropriedadesRepository.save(propriedade);

        return response.status(200).json(propriedade);
    },
    async delete(request: Request, response: Response){
        const {id} = request.params;

        const PropriedadesRepository = getRepository(Propriedade);    

        const propriedade = await PropriedadesRepository.findOne(id);

        if(propriedade !== null && propriedade !== undefined){
            await PropriedadesRepository.delete(propriedade.PropriedadeId)
            return response.json({
                Message: "Exclu??do com Sucesso!"
            });
        }
        else{
            return response.json({
                Message: "Propriedade n??o encontrada!"
            });
        }     
    }
}