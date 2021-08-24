import Header from '../../Components/Header';
import Aside from '../../Components/Aside';


type props = {
    Logo: string;
    UserImg: string;
}

const Produtor = ({ Logo, UserImg }: props) => {
    return (
        <>
            <Header logo={Logo} titulo="CDTR" />
            <Aside UserImg={UserImg} Active="produtor" />
        </>
    )
}

export default Produtor;