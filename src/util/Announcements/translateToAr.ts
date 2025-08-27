import { IAnnouncement } from "../../interface/Announcement";

const translate = require("translate-google");

export const translateToAr = async (body: IAnnouncement): Promise<IAnnouncement> => {
  const translated: IAnnouncement = JSON.parse(JSON.stringify(body));

  try {
    if (body.title) {
      translated.titleEn = body.title;
      translated.titleAr = await translate(body.title, { from: "en", to: "ar" });
    }

    if (body.message) {
      translated.messageEn = body.message;
      translated.messageAr = await translate(body.message, { from: "en", to: "ar" });
    }

    console.log("✅ Translated Announcement:", translated);
    return translated;

  } catch (err) {
    console.error("❌ Translation Error:", err);
    return translated;
  }
};
