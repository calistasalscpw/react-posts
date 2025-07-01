import {Typography, Button} from 'antd';

const Home = ()=> {
    const {Title} = Typography
    
    return(
        <div style={{alignItems: 'center', margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: '100vw', minHeight:'100vh', backgroundColor: 'white'}}>
            <Title style={{color: '#2f27ce', fontWeight: '700'}}>
             Welcome to the KADA Blog
            </Title>
            <Title level={4}>Made using React</Title>
            <Title level={5}>By Calista Salsabila</Title>
        </div>
    )
}

export default Home;