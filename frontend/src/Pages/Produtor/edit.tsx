import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import Container from '../../Components/Container';
import BtnSave from '../../Components/ButtonSave';
import { TextField, MenuItem } from '@material-ui/core';
import { CpfMaskCustom, CnpjMaskCustom, RgMaskCustom, TelefoneMaskCustom } from '../../Util/Mask';
import { useState, useEffect, FormEvent } from 'react';
import ApiUf from '../../Services/ApiUf';
import Api from '../../Services/Api';
import PainelNav from '../../Components/PainelNav';
import { useHistory, useParams } from 'react-router-dom';
import { Produtor } from '../../Interfaces';
import { Uf } from '../../Interfaces';
import Logo from '../../Assets/images/logo.png';
import { useDispatch } from 'react-redux';
import { ProdutoresActive } from '../../Actions/PageActiveActions';

interface Param {
    id: string;
}

interface Error {
    message: string;
    errors: {
        CpfCnpj: string[];
        DataExp: string[];
        DataNasc: string[];
        EstadoExp: string[];
        Nacionalidade: string[];
        Nome: string[];
        OrgaoExp: string[];
        RG: string[];
        TipoPessoa: string[];
        EstadoCivil: string[];
        Telefone: string[];
        UltLaticinio: string[];
        ProdutorId: string[];
    };
}

const EditProdutor = () => {

    const dispatch = useDispatch();

    dispatch(ProdutoresActive());

    const { id } = useParams<Param>();

    const history = useHistory();

    const [produtor, setProdutor] = useState<Produtor>({} as Produtor);

    const [ufs, setUfs] = useState<Uf[]>([]);

    useEffect(() => {
        Api.get(`/produtores/${id}`).then(response => {
            setProdutor(response.data);
            console.log(response.data);
        }).catch((error) => {
            if (error.response.status === 500) history.push('/produtor');
        });

        ApiUf.get('/localidades/estados', {
            params: {
                orderBy: "nome"
            }
        }).then(response => {
            setUfs(response.data);
        });
    }, [id, history]);

    const [Nome, setNome] = useState<string>();
    const [DataNasc, setDataNasc] = useState<string>();
    const [TipoPessoa, setTipoPessoa] = useState<number>(0);
    const [Nacionalidade, setNacionalidade] = useState<string>();
    const [CpfCnpj, setCpfCnpj] = useState<string>();
    const [RG, setRG] = useState<string>();
    const [OrgaoExp, setOrgaoExp] = useState<string>();
    const [EstadoExp, setEstadoExp] = useState<string>("");
    const [DataExp, setDataExp] = useState<string>();
    const [EstadoCivil, setEstadoCivil] = useState<number>(0);
    const [Telefone, setTelefone] = useState<string>();
    const [UltLaticinio, setUltLaticinio] = useState<string>();
    const [ErrorForm, SetErrorForm] = useState<Error>();

    useEffect(() => {
        setNome(produtor.Nome);
        setDataNasc(produtor.DataNasc);
        setTipoPessoa(produtor.TipoPessoa);
        setNacionalidade(produtor.Nacionalidade);
        setCpfCnpj(produtor.CpfCnpj);
        setRG(produtor.RG);
        setOrgaoExp(produtor.OrgaoExp);
        setEstadoExp(produtor.EstadoExp);
        setDataExp(produtor.DataExp);
        setEstadoCivil(produtor.EstadoCivil);
        setTelefone(produtor.Telefone);
        setUltLaticinio(produtor.UltLaticinio);
    }, [produtor]);

    const [inputComponent, setinputComponent] = useState({
        inputComponent: CpfMaskCustom as any,
    });

    const OnSubmit = (event: FormEvent) => {
        event.preventDefault();

        Api.put('/produtores', {
            ProdutorId: produtor.ProdutorId,
            Nome,
            DataNasc,
            TipoPessoa,
            Nacionalidade,
            CpfCnpj,
            RG,
            OrgaoExp,
            EstadoExp,
            DataExp,
            EstadoCivil,
            Telefone,
            UltLaticinio
        })
            .then((response) => {
                response.status === 200
                    ? history.push('/produtor')
                    : alert("N??o foi possivel atualizar o Produtor");
            })
            .catch((error) => {
                SetErrorForm(error.response.data);
            });
    }

    return (
        <>
            <Header logo={Logo} titulo="CDTR" />
            <Aside />
            <Main>
                <PainelNav to={`/produtor`} titulo="Editar Produtor" />

                <Container>

                    <form onSubmit={OnSubmit}>

                        {
                            ErrorForm?.message !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.message}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="Nome"
                            id="Nome"
                            label="Nome"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={Nome}
                            onChange={event => setNome(event.target.value)}
                        />

                        {
                            ErrorForm?.errors.Nome !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.Nome[0]}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="DataNasc"
                            id="DataNasc"
                            label="Data de Nascimento"
                            variant="outlined"
                            fullWidth
                            type="date"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={DataNasc}
                            onChange={event => setDataNasc(event.target.value)}
                        />

                        {
                            ErrorForm?.errors.DataNasc !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.DataNasc[0]}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="TipoPessoa"
                            id="TipoPessoa"
                            label="Tipo de Pessoa"
                            variant="outlined"
                            fullWidth
                            select
                            margin="normal"
                            value={TipoPessoa}
                            onChange={event => {
                                let value = Number(event.target.value);
                                setTipoPessoa(value);

                                value === 1
                                    ? setinputComponent({
                                        inputComponent: CpfMaskCustom as any,
                                    })
                                    : setinputComponent({
                                        inputComponent: CnpjMaskCustom as any,
                                    });
                            }}
                        >

                            <MenuItem key={1} value={1}>
                                F??sica
                            </MenuItem>
                            <MenuItem key={2} value={2}>
                                Jur??dica
                            </MenuItem>

                        </TextField>

                        {
                            ErrorForm?.errors.TipoPessoa !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.TipoPessoa[0]}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="Nacionalidade"
                            id="Nacionalidade"
                            label="Nacionalidade"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={Nacionalidade}
                            onChange={event => setNacionalidade(event.target.value)}
                        />

                        {
                            ErrorForm?.errors.Nacionalidade !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.Nacionalidade[0]}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="CpfCnpj"
                            id="CpfCnpj"
                            label="CPF/CNPJ"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputProps={inputComponent}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={CpfCnpj}
                            onChange={event => setCpfCnpj(event.target.value)}
                        />

                        {
                            ErrorForm?.errors.CpfCnpj !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.CpfCnpj[0]}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="RG"
                            id="RG"
                            label="RG"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputProps={{
                                inputComponent: RgMaskCustom as any,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={RG}
                            onChange={event => setRG(event.target.value)}
                        />

                        {
                            ErrorForm?.errors.RG !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.RG[0]}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="OrgaoExp"
                            id="OrgaoExp"
                            label="Org??o de Expedi????o"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={OrgaoExp}
                            onChange={event => setOrgaoExp(event.target.value)}
                        />

                        {
                            ErrorForm?.errors.OrgaoExp !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.OrgaoExp[0]}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="EstadoExp"
                            id="EstadoExp"
                            label="Estado de Expedi??a??"
                            variant="outlined"
                            select
                            fullWidth
                            margin="normal"
                            value={EstadoExp}
                            onChange={event => setEstadoExp(event.target.value)}
                        >

                            {
                                ufs.map(uf => {
                                    return (
                                        <MenuItem key={uf.id} value={uf.sigla}>
                                            {uf.nome}
                                        </MenuItem>
                                    );
                                })
                            }

                        </TextField>

                        {
                            ErrorForm?.errors.EstadoExp !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.EstadoExp[0]}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="DataExp"
                            id="DataExp"
                            label="Data de Expedi????o"
                            type="date"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            value={DataExp}
                            onChange={event => setDataExp(event.target.value)}
                        />

                        {
                            ErrorForm?.errors.DataExp !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.DataExp[0]}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="EstadoCivil"
                            id="EstadoCivil"
                            label="Estado Civil"
                            variant="outlined"
                            select
                            fullWidth
                            margin="normal"
                            value={EstadoCivil}
                            onChange={event => setEstadoCivil(Number(event.target.value))}
                        >

                            <MenuItem key={1} value={1}>
                                solteiro(a)
                            </MenuItem>
                            <MenuItem key={2} value={2}>
                                casado(a)
                            </MenuItem>
                            <MenuItem key={3} value={3}>
                                separado(a)
                            </MenuItem>
                            <MenuItem key={4} value={4}>
                                divorciado(a)
                            </MenuItem>
                            <MenuItem key={5} value={5}>
                                vi??vo(a)
                            </MenuItem>

                        </TextField>

                        {
                            ErrorForm?.errors.EstadoCivil !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.EstadoCivil[0]}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="Telefone"
                            id="Telefone"
                            label="Telefone"
                            variant="outlined"
                            InputProps={{
                                inputComponent: TelefoneMaskCustom as any,
                            }}
                            fullWidth
                            required
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={Telefone}
                            onChange={event => setTelefone(event.target.value)}
                        />

                        {
                            ErrorForm?.errors.Telefone !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.Telefone[0]}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="UltLaticinio"
                            id="UltLaticinio"
                            label="??ltimo Laticinio"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={UltLaticinio}
                            onChange={event => setUltLaticinio(event.target.value)}
                        />

                        {
                            ErrorForm?.errors.UltLaticinio !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.UltLaticinio[0]}</p>
                                    </div>
                                )
                                : ""
                        }

                        <BtnSave />
                    </form>

                </Container>
            </Main >

            < Footer />
        </>
    );
}

export default EditProdutor;