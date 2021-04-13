import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  isiData: Observable<data[]>;
  isiDataColl: AngularFirestoreCollection<data>;
  note : data;
  constructor(
    public notesService: NotesService, 
    private route: ActivatedRoute, 
    private afStorage: AngularFireStorage,
    afs: AngularFirestore
  ) {
    this.isiDataColl = afs.collection('dataNotes');
    this.isiData = this.isiDataColl.valueChanges();
  } 

  urlImageStorage: string[] = [];
  judul: string = "";

  ngOnInit() {
    this.judul = this.route.snapshot.paramMap.get("judul");
  }

  async ionViewDidEnter() {
    this.tampilkanData();
  }

  tampilkanData() {
    this.urlImageStorage = [];
    var refImage = this.afStorage.storage.ref('utsImgStorage/'+this.judul);
    refImage.listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          itemRef.getDownloadURL().then(url => {
            this.urlImageStorage.unshift(url);
          });
        });
      }).catch((error) => {
        console.log(error);
      });

    console.log(this.urlImageStorage);
  }
}

interface data {
  judul: string,
  isi: string,
  tanggal: Date,
  nilai: number
}