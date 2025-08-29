import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title must not exceed 100 characters"],
    },
    titleEn: {
      type: String,
      minlength: [3, "English title must be at least 3 characters long"],
      maxlength: [100, "English title must not exceed 100 characters"],
    },
    titleAr: {
      type: String,
      minlength: [3, "العنوان يجب أن يكون على الأقل 3 أحرف"],
      maxlength: [100, "العنوان يجب ألا يتجاوز 100 حرف"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      minlength: [5, "Message must be at least 5 characters long"],
      maxlength: [1000, "Message must not exceed 1000 characters"],
    },
    messageEn: {
      type: String,
      minlength: [5, "English message must be at least 5 characters long"],
      maxlength: [1000, "English message must not exceed 1000 characters"],
    },
    messageAr: {
      type: String,
      minlength: [5, "الرسالة يجب أن تكون على الأقل 5 أحرف"],
      maxlength: [1000, "الرسالة يجب ألا تتجاوز 1000 حرف"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Announcement must have a creator"],
    },
    expiresAt: {
      type: Date,
      validate: {
        validator: function (value: Date) {
          return value > new Date();
        },
        message: "Expiration date must be in the future",
      },
    },
  },
  { timestamps: true }
);

const AnnouncementModel = mongoose.model("Announcement", AnnouncementSchema);

export default AnnouncementModel;
