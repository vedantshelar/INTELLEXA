const mongoose = require('mongoose');

const { Schema } = mongoose;

const aiAssistantSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["user", "ai"],
      required: true
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }, 

    businessDataId: {
      type: Schema.Types.ObjectId,
      ref: "BusinessData",
      required: true
    },

    message: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const AiAssistant = mongoose.model("AiAssistant", aiAssistantSchema);

module.exports = AiAssistant;