import { Controller, Get, Path, Route } from "tsoa";
import { Tutor } from "@repo/types";
import { TutorService } from "./tutor.service";

@Route("tutor")
export default class TutorController extends Controller {
  @Get("/")
  public async getTutorByUser(): Promise<Tutor> {
    return new TutorService().get();
  }

  @Get("{tutorId}")
  public async getTutorById(@Path() tutorId: string): Promise<Tutor> {
    return new TutorService().getById(tutorId);
  }
}
