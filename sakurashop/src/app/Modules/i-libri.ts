export interface ILibri {
  id:number;
  titolo:string;
  autore:IAutore;
  genere:IGenere[];
  casaEditrice:ICasaEditrice;
  saga:ISaga;
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

export interface IGenere{
  id:number;
  descrizione:string;
}

export interface IAutore{
  id:number;
  nome:string;
  cognome:string
}
export interface ICasaEditrice{
  id:number;
  nome:string;
}
export interface ISaga{
  id:number;
  nome:string;
  numeroVolumi:number;
}
