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
import { ProdutoresData } from '../../Util/Data';
import ShowData from '../../Components/ShowData';

type props = {
    Logo: string;
    UserImg: string;
    Responsive: string;
    BtnState: string;
    HambClick: Function;
}

interface Param {
    id: string;
}

const DetailsProdutor = ({ Logo, UserImg, Responsive, BtnState, HambClick }: props) => {

    const { id } = useParams<Param>();

    const produtor = ProdutoresData.filter(obj => obj.ProdutorId === parseInt(id))[0];

    return (
        <>
            <Header logo={Logo} titulo="CDTR" responsive={Responsive} btnState={BtnState} onHambClick={HambClick} />
            <Aside UserImg={UserImg} Active="produtor" responsive={Responsive} />
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
                    <ShowData Label="Orgão de Expedição" Data={produtor.OrgaoExp} />
                    <ShowData Label="Estado de Expedição" Data={produtor.EstadoExp} />
                    <ShowData Label="Data de Expedição" Data={produtor.DataExp} />
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