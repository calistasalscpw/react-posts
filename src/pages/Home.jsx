import {Typography, Button} from 'antd';

const Home = ()=> {
    const {Title} = Typography
    
    return(
        <div style={{alignItems: 'center', margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#dedcff', width: '100vw', height: '100vh'}}>
            <Title style={{color: '#2f27ce', alignItems: 'center', fontWeight: '700'}}>
             Welcome to the KADA Blog
            </Title>
            <Title level={4}>Made using React</Title>
            <Title level={5}>By Calista Salsabila</Title>
        </div>
    )
}

export default Home;