import { Component } from '@angular/core';
import { App, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../services/auth.services';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = TabsPage;
  rootPage:any = LoginPage;

  private app;
  private nav;
	private platform;
	private menu: MenuController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private auth: AuthService, 
    app: App,
    menu: MenuController) {
    platform.ready().then(() => {
      this.menu = menu;
		  this.app = app;
		  this.platform = platform;
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  login() {
    this.menu.close();
    this.auth.signOut();
    this.nav.setRoot(LoginPage);
  }

  logout() {
    this.menu.close();
    this.auth.signOut();
    this.nav.setRoot(TabsPage);
  }
}
