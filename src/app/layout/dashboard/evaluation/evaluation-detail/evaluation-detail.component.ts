import { Component, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";
import { EvaluationService } from "../evaluation.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgModel } from "@angular/forms";
import { environment } from "src/environments/environment";
import { Alert } from "selenium-webdriver";
import { config } from "src/assets/config";
import { ModalDirective } from "ngx-bootstrap";

@Component({
  selector: "app-evaluation-detail",
  templateUrl: "./evaluation-detail.component.html",
  styleUrls: ["./evaluation-detail.component.scss"],
})
export class EvaluationDetailComponent implements OnInit {
  // ip = environment.ip;
  @ViewChild("childModal") childModal: ModalDirective;
  tableTitle = "";
  title = "Shop list";
  configFile = config;
  ip: any = this.configFile.ip;
  tableData: any = [];
  loading: boolean;
  loadingData: boolean;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  startDate = new Date();
  endDate = new Date();
  surveyorList: any = [];
  selectedSurveyor: any = [];
  zones: any = [];
  regions: any = [];
  selectedZone: any = {};
  selectedRegion: any = {};
  selectedItem: any = {};
  userType: any;
  evaluatorRole: any;
  selectedEvaluationStatus: any = {};
  evaluationStatusArray: any = [
    {
      id: -1,
      title: "Pending",
    },
    {
      id: 1,
      title: "Approved",
    },
    {
      id: 2,
      title: "Disapproved",
    },
  ];
  p = 0;
  params: any = {};
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private httpService: EvaluationService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.queryParams.subscribe((p) => {
      console.log("active params", p);
      this.params = p;
      if (p.surveyorId && p.startDate && p.endDate && p.userType) {
        this.getSurveyShopDetails(p);
      }
    });
  }

  ngOnInit() {
    const that = this;
    const flag = false;
    this.userType = localStorage.getItem("user_type");
    document.addEventListener("visibilitychange", function (e) {
      console.log(document.hidden);
      if (!document.hidden) {
        that.getSurveyShopDetails(that.params);
      }
    });
  }

  showChildModal(): void {
    this.childModal.show();
  }
  hideChildModal(): void {
    this.childModal.hide();
  }

  setSelectedItem(item) {
    this.selectedItem = item;
  }

  getSurveyShopDetails(obj) {
    this.loading = true;
    this.httpService.getBADataForEvaluation(obj).subscribe(
      (data) => {
        // console.log(data);
        this.tableData = data;
        if (this.tableData.length === 0) {
          this.loading = false;
          this.loadingData = false;
          this.toastr.info("No record found.");
        }
        this.loading = false;
      },
      (error) => {
        this.toastr.info("There was some error extracting the Data.");
        this.loading = false;
      }
    );
  }

  goToEvaluationPage(item) {
    // Sending notEditable Param if shop is already Evaluated (Shop cant be evaluated Twice)
    if (item.evaluation_status == "N") {
      window.open(
        `${environment.hash}dashboard/evaluation/list/details/${item.survey_id}`,
        "_blank"
      );
    } else {
      window.open(
        `${environment.hash}dashboard/evaluation/list/details/${item.survey_id}/${item.m_code}`,
        "_blank"
      );
    }
  }
}
