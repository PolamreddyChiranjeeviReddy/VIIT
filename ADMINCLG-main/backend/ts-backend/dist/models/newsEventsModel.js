"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NewsEventSchema = new mongoose_1.default.Schema({
    type: { type: String, required: false },
    title: { type: String, required: false },
    date: { type: String, required: false },
    description: { type: String, required: false },
    pathlink: { type: String, required: false },
    image: {
        url: { type: String, required: false },
        key: { type: String, required: false },
        contentType: { type: String, required: false }
    },
    bgColor: { type: String, required: false }
}, { timestamps: true });
// export default mongoose.model<INewsEvent>('NewsEvent', NewsEventSchema);
const newEventsModel = mongoose_1.default.models.NewsEvent || mongoose_1.default.model("NewsEvent", NewsEventSchema);
exports.default = newEventsModel;
//# sourceMappingURL=newsEventsModel.js.map