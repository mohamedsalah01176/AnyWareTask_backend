
export interface IAnnouncement {
  _id?: string;
  title: string;         
  titleEn?: string;     
  titleAr?: string;     
  message: string;       
  messageEn?: string;  
  messageAr?: string;    
  createdBy?: string; 
  expiresAt: Date;  
  createdAt?: Date;
  updatedAt?: Date;
}