import { IQuiz } from "../../interface/quiz";
const translate = require("translate-google");

export const translateToAr = async (body: IQuiz): Promise<IQuiz> => {
  const translated: IQuiz = JSON.parse(JSON.stringify(body));

  try {
    if(body.course){
      translated.course.titleEn=body.course.title;
      translated.course.titleAr= await translate(body.course.title, { from: "en", to: "ar" })
    }
    for (let i = 0; i < body.questions.length; i++) {
      const q = body.questions[i];

      if (q.question) {
        translated.questions[i].questionEn = q.question;
        translated.questions[i].questionAr = await translate(q.question, { from: "en", to: "ar" });
      }

      for (let j = 0; j < q.answers.length; j++) {
        const a = q.answers[j];

        if (a.text) {
          translated.questions[i].answers[j].textEn = a.text;
          translated.questions[i].answers[j].textAr = await translate(a.text, { from: "en", to: "ar" });
        }
      }
    }

    console.log("✅ Translated Quiz:", translated);
    return translated;

  } catch (err) {
    console.error("❌ Translation Error:", err);
    return translated;
  }
};
