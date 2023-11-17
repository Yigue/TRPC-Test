import { prop,modelOptions,getModelForClass} from "@typegoose/typegoose";
import { boolean } from "zod";


@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Note {
  @prop({ type: String })
  title: string;

  @prop({ type: String })
  description: string;

  @prop({ type: Boolean,default:false })
  done: boolean;
}
export default getModelForClass(Note)