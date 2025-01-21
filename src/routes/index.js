import React, {Component} from 'react';
import {Router, Scene, Stack, Drawer} from 'react-native-router-flux';
import Login from '../pages/login';
import Signup from '../pages/signup';
import HomePage from '../pages/homePage';
import Profile from '../pages/profile';
import EditProfile from '../pages/editProfile';
import ContactUs from '../pages/contactUs';
import Inbox from '../pages/inbox';
import MainPage from '../printing/mainPage';
import Pending from '../printing/pending';
import Completed from '../printing/completed';
import CreateDocPage from '../printing/createDocPage';
import ViewOrder from '../printing/viewOrder';
import ManageWallet from '../pages/manageWallet';
import Topup from '../pages/topup';
import ViewOrderCancel from '../printing/viewOrderCancel';
import Vendor from '../pages/vendor';
import Confirm from '../printing/confirm';
import CreateThesisPage from '../printing/createThesisPage';
import AboutUs from '../pages/aboutUs';

import { AsyncStorage, ActivityIndicator } from 'react-native';
import { DrawerRouter } from '@react-navigation/native';
import SideBar from '../components/sideBar';

class App extends Component{
    constructor(){
        super();
        this.state = {hasToken: false, isLoaded: false};
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then((token)=> {
            this.setState({hasToken:token !== null, isLoaded: true})
        });
    }

    render(){
        if(!this.state.isLoaded){
            return(
                <ActivityIndicator/>
            )
        }else{
            return(
                <Router>
                <Drawer 
                drawerPosition = "right" 
                contentComponent={SideBar}>
                    <Scene key='root'>
                            <Scene 
                                component={Login}
                                initial={!this.state.hasToken}
                                hideNavBar={true}
                                key='Login'
                                title='Login'
                            />
                            <Scene
                                component={Signup}
                                hideNavBar={true}
                                key='Signup'
                                title='Signup'
                            />
                            <Scene
                                component={HomePage}
                                initial={this.state.hasToken}
                                key='HomePage'
                                title='HomePage'
                                drawer={true}
                            />
                            <Scene
                                component={Profile}
                                key='Profile'
                                title='Profile'
                                drawer={true}
                            />
                            <Scene
                                component={EditProfile}
                                key='EditProfile'
                                title='EditProfile'
                                drawer={true}
                            />
                            <Scene
                                component={ContactUs}
                                key='ContactUs'
                                title='ContactUs'
                                drawer={true}
                            />
                            <Scene
                                component={Inbox}
                                key='Inbox'
                                title='Inbox'
                                drawer={true}
                            />
                            <Scene
                               component={MainPage}
                                key='MainPage'
                                title='New Project'
                                drawer={true} 
                            />
                            <Scene
                               component={Pending}
                                key='Pending'
                                title='Pending'
                                drawer={true} 
                            />
                            <Scene
                               component={Completed}
                                key='Completed'
                                title='Completed'
                                drawer={true} 
                            />
                            <Scene
                               component={CreateDocPage}
                                key='CreateDocPage'
                                title='Create'
                                drawer={true} 
                            />
                            <Scene
                               component={ViewOrder}
                                key='ViewOrder'
                                title='Order'
                                drawer={true} 
                            />
                            <Scene
                               component={ManageWallet}
                                key='ManageWallet'
                                title='ManageWallet'
                                drawer={true} 
                            />
                            <Scene
                               component={Topup}
                                key='Topup'
                                title='Topup'
                                drawer={true} 
                            />
                            <Scene
                               component={ViewOrderCancel}
                                key='ViewOrderCancel'
                                title='ViewOrderCancel'
                                drawer={true} 
                            />
                            <Scene
                               component={Vendor}
                                key='Vendor'
                                title='Vendor'
                                drawer={true} 
                            />
                            <Scene
                               component={Confirm}
                                key='Confirm'
                                title='Confirm'
                                drawer={true} 
                            />
                            <Scene
                               component={CreateThesisPage}
                                key='CreateThesisPage'
                                title='CreateThesisPage'
                                drawer={true} 
                            />
                            <Scene
                               component={AboutUs}
                                key='AboutUs'
                                title='AboutUs'
                                drawer={true} 
                            />
                        </Scene>
                    </Drawer>
                </Router>
            )
        }
    }
}

export default App;