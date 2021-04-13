import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  isiData: Observable<data[]>;
  isiDataColl: AngularFirestoreCollection<data>;
  constructor(
    private router: Router,
    private afStorage: AngularFireStorage,
    public notesService: NotesService,
    afs: AngularFirestore
  ) {
    this.isiDataColl = afs.collection('dataNotes');
    this.isiData = this.isiDataColl.valueChanges();
  }

  ngOnInit() {
  }

  AksesIni(judul)
  {
    alert("jancok");
    this.router.navigate(["/tabs/tab3/" + judul]);
  }
}

interface data {
  judul: string,
  isi: string,
  tanggal: Date,
  nilai: number
}
