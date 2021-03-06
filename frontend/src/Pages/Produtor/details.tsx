import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import Container from '../../Components/Container';
import BtnEdt from '../../Components/ButtonEdt';
import PainelNav from '../../Components/PainelNav';
import { useParams } from 'react-router-dom';
import { GetTipoPessoa, GetEstadoCivil } from '../../Util/Functions';
import ShowData from '../../Components/ShowData';
import Api from '../../Services/Api';
import { useState, useEffect } from 'react';
import { Produtor } from '../../Interfaces';
import Logo from '../../Assets/images/logo.png';
import { useDispatch } from 'react-redux';
import { ProdutoresActive } from '../../Actions/PageActiveActions';

interface Param {
    id: string;
}

const DetailsProdutor = () => {
    const dispatch = useDispatch();

    dispatch(ProdutoresActive());

    const { id } = useParams<Param>();

    const [produtor, setProdutor] = useState<Produtor>();

    useEffect(() => {
        Api.get(`/produtores/${id}`).then(response => {
            setProdutor(response.data);
        });
    }, [id]);

    if (produtor === undefined) {
        return (
            <p>Carregando...</p>
        );
    }

    return (
        <>
            <Header logo={Logo} titulo="CDTR" />
            <Aside />
            <Main>
                <PainelNav to="/produtor" titulo="Detalhes do Produtor" />
                <Container>
                    <ShowData Label="Id" Data={produtor.ProdutorId} />
                    <ShowData Label="Nome" Data={produtor.Nome} />
                    <ShowData Label="Data de Nascimento" Data={produtor.DataNasc} />
                    <ShowData Label="Tipo de Pessoa" Data={GetTipoPessoa(produtor.TipoPessoa)} />
                    <ShowData Label="Nacionalidade" Data={produtor.Nacionalidade} />
                    <ShowData Label="CPF/CNPJ" Data={produtor.CpfCnpj} />
                    <ShowData Label="RG" Data={produtor.RG} />
                    <ShowData Label="Org??o de Expedi????o" Data={produtor.OrgaoExp} />
                    <ShowData Label="Estado de Expedi????o" Data={produtor.EstadoExp} />
                    <ShowData Label="Data de Expedi????o" Data={produtor.DataExp} />
                    <ShowData Label="Estado Civil" Data={GetEstadoCivil(produtor.EstadoCivil)} />
                    <ShowData Label="Telefone" Data={produtor.Telefone} />
                    <ShowData Label="Ultimo Laticinio" Data={produtor.UltLaticinio} />
                </Container>
            </Main>
            <BtnEdt to={`/produtor/edit/${produtor.ProdutorId}`} />
            <Footer />
        </>
    );
}

export default DetailsProdutor;