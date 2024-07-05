export interface IUser {
  id:number,
  firstName:string,
  lastName:string,
  username:string,
  email:string,
  password:string,
  avatar?:string,
  roles:IRole[],


}

export interface IRole{

  roleType:string,
}
