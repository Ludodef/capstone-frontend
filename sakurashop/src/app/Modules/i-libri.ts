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
}

export interface ITipo{

  bookType:string;
}


