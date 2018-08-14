import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Flashlight } from '@ionic-native/flashlight';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public photos : any;
  public base64Image : string;
  isOn:boolean;
status:string;
  constructor(public navCtrl: NavController,private camera: Camera,private alertCtrl : AlertController,private flash:Flashlight , private platform:Platform) {}
  ngOnInit() {
    this.photos = [];
  }


  takePhoto(){
    const options : CameraOptions = {
      quality: 100, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true,
      saveToPhotoAlbum:true
    }


    this.camera.getPicture(options) .then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.photos.push(this.base64Image);
      this.photos.reverse();
    }, (err) => {
      console.log(err);
    });
}
deletePhoto(index) {
  this.photos.splice(index, 1);
let confirm =this.alertCtrl.create({
  title: 'Delete?',
  message:'',
  buttons:[
{
      text: 'Yes',
      handler: () =>{
        console.log('Agree clicked');
            this.photos.splice(index, 1);
      }
    }
  ]
});
confirm.present();
}
Gallery(){
  const options : CameraOptions = {
    quality: 100, // picture quality
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation:true,
    saveToPhotoAlbum:true
  }
  this.camera.getPicture(options) .then((imageData) => {
    this.base64Image = "data:image/jpeg;base64," + imageData;
    this.photos.push(this.base64Image);
    this.photos.reverse();
  }, (err) => {
    console.log(err);
  });
  }
  toggle(){
    this.flash.toggle();
    this.updateFlashlightStatus()
 
  }
  updateFlashlightStatus(){
    this.isOn= this.flash.isSwitchedOn();
  
  }
}

 