import { Component, OnInit, SimpleChange } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NotesService } from '../services/notes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  isiData: Observable<data[]>;
  isiDataColl: AngularFirestoreCollection<data>;
  judul: string = "";
  isi: string = "";
  tanggal: Date = null;
  nilai : number = 0;
  gambar: string = "";
  urlImageStorage: string[] = [];

  constructor(
    private afStorage: AngularFireStorage,
    public notesService: NotesService,
    afs: AngularFirestore
    ) { 
    this.isiDataColl = afs.collection('dataNotes');
    this.isiData = this.isiDataColl.valueChanges();
  }

  ngOnInit() {

  }

  TambahFoto() {
    this.notesService.tambahFoto();
  }

  TambahNote(){
    if(this.CheckValid()){
      this.uploadNote();
    }
    else{
      this.AlertError();
    }    
  }

  uploadNote() {
    this.urlImageStorage = [];
    for (var index in this.notesService.dataFoto) {
      const imgFilepath = `utsImgStorage/${this.judul}/${this.notesService.dataFoto[index].filePath}`;
      this.afStorage.upload(imgFilepath, this.notesService.dataFoto[index].dataImage).then(() => {
        this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url) => {
          this.urlImageStorage.unshift(url);
        });
      });
    }
    if(this.notesService.dataFoto.length > 0){
      this.isiDataColl.doc(this.judul).set({
        judul: this.judul,
        isi: this.isi,
        tanggal: this.tanggal,
        nilai: this.nilai
      });
    }
  }

  CheckValid() {
    if(this.judul == "" || this.isi == "" || this.nilai < 0 || this.tanggal == null)
    {
      return false;
    }
    return true;
  }

  AlertError(){
    alert("Data yang diinputkan ada yang salah")
  }

}

interface data {
  judul: string,
  isi: string,
  tanggal: Date,
  nilai: number
}
