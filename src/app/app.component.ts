import { Component, ViewChild } from '@angular/core';
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
	@ViewChild(Nav) nav: Nav;
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
    this.initializeApp();
  }

  initializeApp(){
    this.auth.afAuth.authState
    .subscribe(
      user => {
        if (user) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = LoginPage;
        }
      },
      () => {
        this.rootPage = LoginPage;
      }
    );
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
