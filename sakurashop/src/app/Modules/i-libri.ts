import { IUser } from "./i-user";

export interface ILibri {
  id:number;
  titolo:string;
  autore:string;
  genere:string;
  casaEditrice:string;
  saga:string;
  tipoCartaceo:ITipo;
  prezzo:number;
  trama:string;
  immagine:string;
  isbn:string;
  numeroPagine:number;
  disponibile:boolean;
  idUser?:number;
  quantita:number
}

export interface ITipo{

  bookType:string;
}


