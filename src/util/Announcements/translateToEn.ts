import { IAnnouncement } from "../../interface/Announcement";
const translate = require("translate-google");

export const translateToEn = async (body: IAnnouncement): Promise<IAnnouncement> => {
  const translated: IAnnouncement = JSON.parse(JSON.stringify(body));

  try {
    if (body.title) {
      translated.titleAr = body.title;
      translated.titleEn = await translate(body.title.trim(), { from: "ar", to: "en" });
    }

    if (body.message) {
      translated.messageAr = body.message;
      translated.messageEn = await translate(body.message.trim(), { from: "ar", to: "en" });
    }

    console.log("✅ Translated Announcement:", translated);
    return translated;

  } catch (err) {
    console.error("❌ Translation Error:", err);
    return translated;
  }
};
