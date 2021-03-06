import { Component, OnInit } from "@angular/core";
import { Trello } from "../trello";
import { BoardService } from "../board.service";
import { ActivatedRoute } from "@angular/router";
declare var $: any;
@Component({
  selector: "app-column",
  templateUrl: "./column.component.html",
  styleUrls: ["./column.component.css"]
})
export class ColumnComponent implements OnInit {
  trello: Trello;
  boardname: string;
  boardid: number;
  cardid: number;
  cardname: string;
  id: number;
  name: string;
  constructor(
    private boardservice: BoardService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get("name");
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.trello = this.boardservice
      .getTrello()
      .filter(trello => trello.id === this.id)[0];
    $(document).ready(function() {
      $(".sortable-list").sortable({
        connectWith: ".sortable-list",
        opacity: "0.5",
        cursor: "move",
        stop: function() {
          $(".sortable-list").each(function() {
            console.log($(this).sortable("toArray"));
          });
        },
        receive: function(event, ui) {
          var element = ui.item.index();
          console.log(element);
        }
      });
    });
  }
  addcard(cname: string, bid: number, trelloname: string) {
    for (var i = 0; i < this.trello.board.length; i++) {
      if (this.trello.board[i].id === bid) {
        this.boardservice.pushCard(cname, bid, trelloname);
      }
    }
  }
  addBoard(trelloname: string) {
    var Name = {
      id: Math.floor(Math.random() * 100 + 1),
      name: this.boardname,
      card: [
        {
          id: Math.floor(Math.random() * 100 + 1),
          name: this.cardname
        }
      ]
    };
    if (this.trello.name === trelloname) {
      this.boardservice.pushBoard(Name, trelloname);
    }

    this.boardid = null;
    this.boardname = null;
    this.cardid = null;
    this.cardname = null;
  }
}
