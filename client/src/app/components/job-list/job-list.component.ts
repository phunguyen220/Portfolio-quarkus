import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Job } from '../../model/job';
import { JobServiceService } from '../../service/job-service.service';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { User } from '../../model/user';
import { filter } from 'rxjs';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit {
  idProfileNumber: number | undefined;
  currentUrl?: string;

  userCurrent: User = new User();
  job: Job = new Job();

  jobs: Job[] = [];
  newJobs: Job[] = [];
  sentJobs: Job[] = [];
  acceptedJobs: Job[] = [];
  displayJob: Job[] = [];

  profilesPerPage = 6;
  currentPage = 0;

  @Input() user: User = new User();
  @Input() idCompany!: number | undefined;
  @Input() isListJob: boolean = false;

  constructor(
    private jobService: JobServiceService,
    public router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentUrl = this.router.url;
      });
  }

  ngOnInit(): void {
    console.log('Start job list');

    if (isPlatformBrowser(this.platformId)) {
      const idProfileUser = localStorage.getItem('idProfileUser');
      this.idProfileNumber = idProfileUser ? Number(idProfileUser) : undefined;

      const userCurrentString = localStorage.getItem('userCurrent');
      if (userCurrentString) {
        this.userCurrent = JSON.parse(userCurrentString);
      }
    }

    this.currentUrl = this.router.url;

    if (this.idCompany) {
      this.getJobsByIdCompany(this.idCompany);
    }

    if (this.idProfileNumber !== undefined) {
      this.getNewJob(this.idProfileNumber);
      this.getJobPending(this.idProfileNumber);
      this.getJobAccepted(this.idProfileNumber);
      console.log(this.idProfileNumber + ' new');
    }
  }

  getJobs(): void {
    console.log('getJobs');
    this.jobService.getAllJobs().subscribe({
      next: (data) => {
        this.newJobs = data;
        this.updateDisplayedProfiles();
      },
      error: (error) => {
        console.error('Error loading jobs:', error);
      }
    });
  }

  getJobsByIdCompany(id: number): void {
    this.jobService.getJobByCompany(id).subscribe({
      next: (data) => {
        this.jobs = data;
      },
      error: (error) => {
        console.error('Error loading jobs by company:', error);
      }
    });
  }

  getNewJob(idProfile: number): void {
    this.jobService.getNewJob(idProfile).subscribe({
      next: (data) => {
        this.newJobs = data;
        console.log(this.newJobs.length + ' new jobs');
        this.updateDisplayedProfiles();
      },
      error: (error) => {
        console.error('Error loading new jobs:', error);
      }
    });
  }

  getJobPending(idProfile: number): void {
    this.jobService.getJobPending(idProfile).subscribe({
      next: (data) => {
        this.sentJobs = data;
      },
      error: (error) => {
        console.error('Error loading pending jobs:', error);
      }
    });
  }

  getJobAccepted(idProfile: number): void {
    this.jobService.getJobAccepted(idProfile).subscribe({
      next: (data) => {
        this.acceptedJobs = data;
      },
      error: (error) => {
        console.error('Error loading accepted jobs:', error);
      }
    });
  }

  viewJobDetails(job: Job): void {
    if (job.id) {
      this.jobService.setJob(job);
      this.router.navigate(['job-details/', job.id]);
    }
  }

  applyJobs(idJob?: number): void {
    if (idJob && this.idProfileNumber) {
      this.jobService.applyJobs(idJob, this.idProfileNumber).subscribe({
        next: (data) => {
          if (data && isPlatformBrowser(this.platformId)) {
            alert('Job applied successfully');
          }
        },
        error: (error) => {
          console.error('Error applying job:', error);
        }
      });
    }
  }

  updateDisplayedProfiles(): void {
    const startIndex = this.currentPage * this.profilesPerPage;
    this.displayJob = this.newJobs.slice(
      startIndex,
      startIndex + this.profilesPerPage
    );
    console.log(this.displayJob + ' new jobs displayJob');
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages() - 1) {
      this.currentPage++;
      this.updateDisplayedProfiles();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateDisplayedProfiles();
    }
  }

  totalPages(): number {
    return Math.ceil(this.newJobs.length / this.profilesPerPage);
  }
}