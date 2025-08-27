export interface ICourse {
  title: string;              
  titleEn?: string;           
  titleAr?: string;          

  description: string;       
  descriptionEn?: string;     
  descriptionAr?: string;     

  numberQuiz: number;         
  updatedAt: Date;            
}