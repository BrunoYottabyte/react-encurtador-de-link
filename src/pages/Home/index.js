import React , { useState }from 'react'

import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from "@expo/vector-icons"
import { TouchableWithoutFeedback, Keyboard , KeyboardAvoidingView, Platform, Modal, ActivityIndicator } from 'react-native'

// components
import StatusBarPage from '../../components/StatusBarPage'
import Menu from '../../components/Menu'
import {
 ContainerLogo, Logo, ContainerContent,
 Title, SubTitle, ContainerInput,
 BoxIcon, Input, ButtonLink, ButtonLinkText

} from './styles'
import ModalLink from '../../components/ModalLink'

// Import api
import api from '../../services/api';

const Home = () => {

     const [loading, setLoading] = useState(false);

     const [input, setInput] = useState('')

     const [modalVisible, setModalVisible] = useState(false);

     const [data, setData] = useState({});

     const handleShortLink = async() =>{
          setLoading(true);
          try{
               const response = await api.post('/shorten',
               {
                    long_url: input
               })

               const shortLink = response.data.link
               setModalVisible(true)
               setData(response.data)
               setLoading(false)
               setInput('')
               Keyboard.dismiss()
               
          }catch(err){
               alert('Ops parece que algo deu errado.')
               setInput('');
               Keyboard.dismiss();
               setLoading(false);
          }

     }


     return(
          <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss()}>   
               <LinearGradient
                    colors={['#1ddbb9', '#132742']}
                    style={{flex:1, justifyContent: 'center'}}
               >
                    <StatusBarPage 
                    backgroundColor="#1ddbb9"
                    barStyle="light-content"/>

                    <Menu/>
               {/*LEVANTANDO CONTEUDO AO ABRIR TECLADO*/}
               <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'position'} enabled={true}> 
                    
                    <ContainerLogo>
                         <Logo source={require('../../assets/logo.jpg')}/>
                    </ContainerLogo>

                    <ContainerContent>
                         <Title>SujeitoLink</Title>
                         <SubTitle>Cole seu link para encurtar</SubTitle>

                         <ContainerInput>
                              <BoxIcon>
                                   <Feather  name="link" size={22} color="#fff" />
                              </BoxIcon>
                              <Input placeholder="Cole seu Link Aqui" placeholderTextColor="white" 
                              autoCapitalize="none" autoCorrect={false} keyboardType="url"
                              value={input} onChangeText={(text) => setInput(text)}
                              />
                         </ContainerInput>

                         <ButtonLink onPress={handleShortLink}>
                              {
                                   loading ? (
                                        <ActivityIndicator color="#121212" size={24} />
                                   ) : (
                                        <ButtonLinkText>Gerar Link</ButtonLinkText>
                                   )
                              }
                         </ButtonLink>
                    </ContainerContent>
                                             
               </KeyboardAvoidingView>
                    <Modal visible={modalVisible} transparent animationType="slide">
                         <ModalLink onClose={() => setModalVisible(false)} response={data} />
                    </Modal>
               </LinearGradient>
          
          </TouchableWithoutFeedback>
     )
}

export default Home