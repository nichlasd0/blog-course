import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/article';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  article!: Article;
  saved!: boolean;
  isNew!: boolean;

  constructor(private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      const key: string = params.key;

      if(key !== "new") {
        this.getArticle(key);
      } else {
        this.article = new Article();
        this.article.published = false;
        this.isNew = true;
      }


    })
  }

  getArticle(key: string): void {
    this.dashboardService.getArticle(key).subscribe(
      (article: Article) => {
        if (article === null) {
        this.router.navigateByUrl("404");
        return;
      }
      this.article = article;
      });
  }

  updateArticle(): void {
    this.saved = false;

    this.dashboardService.updateArticle(this.article).subscribe(result => {
      this.article = result;
      this.saved = true;
    });
  }

  viewPreview(): void {
    this.router.navigateByUrl("/dashboard/preview/" + this.article.key);
  }
  
  deleteArticle(): void {
    this.saved = false;

    const deletionConfirmed = confirm(`Deleting '${this.article.title}'. Are you sure?`);

    if(deletionConfirmed) {
      this.dashboardService.deleteArticle(this.article.id).subscribe(() => {this.router.navigateByUrl("dashboard");
    }, error => alert(error.message)
    );
    }
  }

  createArticle(): void {
    this.saved = false;
    this.dashboardService.createArticle(this.article).subscribe(result => {
      this.article = result;
      this.saved = true;
      this.isNew = false
    })
  }
  
  updateKey(): void {
    this.article.key = this.article.title.toLowerCase().replace(new RegExp(' ', 'g'), '-');
  }
}
