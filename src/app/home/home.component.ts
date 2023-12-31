import { Component, OnInit } from '@angular/core';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { FootballApiService } from '../core/football-api.service';
import { TopLeaguesIDs } from '../core/enums/leagues.enum';
import { Standings } from '../core/models/standings.model';
import { GeneralMapper } from '../core/general-mapper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{


  constructor(private footballApiService: FootballApiService, private generalMapper: GeneralMapper){}

  items: MenuItem[] = [{}];
  activeItem: MenuItem = {};
  topLeagueId: number = 39;

  standings : Standings[] = []; 

    ngOnInit() {
        this.items = [
            { label: 'England', icon: 'pi pi-fw pi-flag-fill' , id:'englandSelect', command:(e) => this.getStandings(TopLeaguesIDs.PremierLeague,e)},
            { label: 'Spain', icon: 'pi pi-fw pi-flag-fill' , id:'spainSelect', command:(e) => this.getStandings(TopLeaguesIDs.LaLiga,e)},
            { label: 'Germany', icon: 'pi pi-fw pi-flag-fill' , id:'germanySelect', command:(e) => this.getStandings(TopLeaguesIDs.Bundesliga,e)},
            { label: 'France', icon: 'pi pi-fw pi-flag-fill' , id:'franceSelect', command:(e) => this.getStandings(TopLeaguesIDs.Ligue1,e)},
            { label: 'Italy', icon: 'pi pi-fw pi-flag-fill' , id:'italySelect', command:(e) => this.getStandings(TopLeaguesIDs.SerieA,e)}
        ];
        this.activeItem =  this.footballApiService.activeItem ?? this.items[0];
        this.topLeagueId = this.footballApiService.topLeagueId ?? TopLeaguesIDs.PremierLeague;
        this.getStandings(this.topLeagueId,{item:this.activeItem});
    }

    getStandings(leagueId:number,e:MenuItemCommandEvent){
      if(e.item){
        this.footballApiService.activeItem = e.item;
      }
      this.footballApiService.topLeagueId = leagueId;
      this.footballApiService.getStandings(leagueId).subscribe((res)=>{
        this.standings = res;
      })
    }
    
}
