import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http/http.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { subscribeOn } from 'rxjs/operators';
import { log } from 'console';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild('titleText') preview:any;
  @ViewChild('selectedImg') img:any;
  prodId: string = '';
  productDetails: any = [];
  imageDetails: any = [];
  public counter: number;
  customOptions: OwlOptions = {
    loop: true, mouseDrag: true, touchDrag: true, pullDrag: false, dots: false,
    navSpeed: 700, autoplay: false, autoplayHoverPause: true, autoplayTimeout: 5000, margin: 30,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: { 0: { items: 1 }, 250: { items: 3 }, 500: { items: 3 }, 750: { items: 4 } }, nav: true
  }
  imgId:any; selNo: any = 1; selectedImages: any; selClass: any = "product_gallery_item active"; notSelClass: any = "product_gallery_item";
  constructor(public data: SharedDataService,
    public route: ActivatedRoute,
    public router: Router,
    public api: HttpService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.prodId = String(routeParams.get('pId'));
    this.data.checkCartData() //cart

    this.api.post('FETCH_SINGLE_PRODUCT_DETAILS', { productId: this.prodId }).subscribe(res => { //Get Category details
      this.productDetails = res.response.productData[0];
      this.imageDetails = JSON.parse(JSON.stringify(res.response.productImages));
      console.log("image response--" + this.imageDetails);
      this.counter = this.imageDetails.length;
      this.selectedImages = this.imageDetails[0].images;
      this.imgId = "img1";
    });




    /* for(let i1 =0;i1<this.imageDetails.length;i1++) {
       console.log("image name--"+this.imageDetails[i1]);
     }*/
  }

  selectImg(a: any, no: any, id:any) {
    this.selectedImages = a;
    this.selNo = no;
    this.imgId = id;
  }

  zoomFlag:any=0; //imgBackgroundSize:any; imgBackgroundPosition:any;
  imageMagnifier() {
    this.img.nativeElement = document.getElementById("product_img");

    //calculating the ratio by which we want to magnify the image
    //you can increase or decrease it according to your requirement
    var x = this.preview.nativeElement.offsetWidth / 100;
    var y = this.preview.nativeElement.offsetHeight / 100;

    this.img.nativeElement.addEventListener("mousemove", (e:any) => {
      this.zoomFlag = 1;
      // this.preview.nativeElement.style.backgroundImage = this.selectedImages;
      //   this.imgBackgroundSize = this.img.nativeElement.width * x +
      //   "px " + this.img.nativeElement.height * y + "px";
      // var posX = e.offsetX;
      // var posY = e.offsetY;
      // this.imgBackgroundPosition = "-" + posX * x +
      //   "px -" + posY * y + "px";
        console.log(this.selectedImages, this.preview.nativeElement.style.backgroundImage);
    });
    this.img.nativeElement.addEventListener("mouseout", () => {
      // this.preview.nativeElement.style.backgroundImage = "none";
      this.zoomFlag = 0;
    });
  }





  
  function() { }

}




