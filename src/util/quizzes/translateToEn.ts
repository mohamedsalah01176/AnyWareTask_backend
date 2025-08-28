import { IQuiz } from "../../interface/quiz";
const translate = require("translate-google");

export const translateToEn = async (body: IQuiz): Promise<IQuiz> => {
  const translated: IQuiz = JSON.parse(JSON.stringify(body));

  try {
    if (body.title) {
      translated.titleAr = body.title;
      translated.titleEn = await translate(body.title, { from: "ar", to: "en" });
    }
    if (body.description) {
      translated.descriptionAr = body.description;
      translated.descriptionEn = await translate(body.description, { from: "ar", to: "en" });
    }
    if (body.course) {
      translated.course.titleAr = body.course.title;
      translated.course.titleEn = await translate(body.course.title, { from: "ar", to: "en" });
    }

    for (let i = 0; i < body.questions.length; i++) {
      const q = body.questions[i];

      if (q.question) {
        translated.questions[i].questionAr = q.question;
        translated.questions[i].questionEn = await translate(q.question, { from: "ar", to: "en" });
      }

      for (let j = 0; j < q.answers.length; j++) {
        const a = q.answers[j];

        if (a.text) {
          translated.questions[i].answers[j].textAr = a.text;
          translated.questions[i].answers[j].textEn = await translate(a.text, { from: "ar", to: "en" });
        }
      }
    }

    console.log("✅ Translated Quiz (AR→EN):", translated);
    return translated;

  } catch (err) {
    console.error("❌ Translation Error:", err);
    return translated;
  }
};
