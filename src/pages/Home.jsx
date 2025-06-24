import {Typography} from 'antd';

const Home = ()=> {
    const {Title} = Typography
    
    return(
        <div style={{alignItems: 'center', margin: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: '100vw', minHeight:'100vh', backgroundColor: 'white'}}>
            <Title>
             Welcome to the Post Blog
            </Title>
            <Title level={4}>Made using React</Title>
            <Title level={5}>By Calista Salsabila</Title>
        </div>
    )
}

export default Home;