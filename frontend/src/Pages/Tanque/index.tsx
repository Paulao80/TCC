import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import MUIDataTable from "mui-datatables";
import ButtonAdd from '../../Components/ButtonAdd';
import ButtonAct from '../../Components/ButtonAct';
import { RowsDeleted, Tanque as ITanque } from '../../Interfaces';
import { useState, useEffect } from 'react';
import Api from '../../Services/Api';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TanquesActive } from '../../Actions/PageActiveActions';
import Logo from '../../Assets/images/logo.png';

const Tanque = () => {
    const dispatch = useDispatch();

    dispatch(TanquesActive());

    const location = useLocation();

    const [Tanques, setTanques] = useState<ITanque[]>([]);

    useEffect(() => {
        Api.get('/tanques')
            .then((response) => {
                setTanques(response.data);
            })
    }, [location]);

    const customFotoRender = (value: string) => {
        return (
            <img className="img-tanque" src={value} alt="Foto" />
        );
    }

    const customAcoesRender = (value: string) => {
        return (
            <div className="div-act">
                <ButtonAct to={`/tanque/produtores/${value}`} type="produtores" />
                <ButtonAct to={`/tanque/edit/${value}`} type="editar" />
                <ButtonAct to={`/tanque/details/${value}`} type="detalhes" />
            </div>
        );
    }

    const columns = [
        {
            name: "FotoPath",
            label: "Foto",
            options: {
                filter: false,
                sort: false,
                customBodyRender: customFotoRender
            }
        },
        {
            name: "TanqueId",
            label: "ID",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Capacidade",
            label: "Capacidade (L)",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Marca",
            label: "Marca",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "TanqueId",
            label: "A????es",
            options: {
                filter: true,
                sort: false,
                customBodyRender: customAcoesRender
            }
        }
    ];

    const setRowProps = () => {
        return {
            style: { cursor: 'pointer' }
        }
    }

    const onRowsDelete = (rowsDeleted: RowsDeleted, newTableData: any) => {

        rowsDeleted.data.map(async (row) => {

            let tanque = Tanques[row.dataIndex];

            await Api.delete(`/tanques/${tanque.TanqueId}`)
                .then((response) => {
                    alert(response.data.Message);
                })
                .catch(() => {
                    alert("Error");
                });
        });

    }

    const options = {
        setRowProps,
        onRowsDelete
    };

    return (
        <>
            <Header logo={Logo} titulo="CDTR" />
            <Aside />
            <Main>
                <MUIDataTable
                    title="Tanques"
                    data={Tanques}
                    columns={columns}
                    options={options}
                />
            </Main>
            <ButtonAdd to="/tanque/create" />
            <Footer />
        </>
    )
}

export default Tanque;