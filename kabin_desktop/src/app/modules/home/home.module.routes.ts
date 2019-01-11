
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DefaultViewComponent } from './default-view/default-view.component';

export const HomeRoutes: Routes = [
	{
		path: 'home',
		component: HomeComponent,
		children: [
			{
				path: "view",
				component: DefaultViewComponent,
				outlet: "default"
			},
		]
	}];
