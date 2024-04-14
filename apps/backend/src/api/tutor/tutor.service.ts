import { Tutor } from "@repo/types";
import supabase from "../../startup/database";

export class TutorService {
  public async getById(id: string): Promise<Tutor> {
    const { data: tutor, error: errorTutor } = await supabase.from('tutor').select('id, family, pseudo, user').eq('id', id).single()
    if (errorTutor) throw new Error(errorTutor.message)
    return tutor
  }

  public async get(): Promise<Tutor> {
    const { data: tutor, error: errorTutor } = await supabase.from('tutor').select('id, family, pseudo, user').single()
    if (errorTutor) throw new Error(errorTutor.message)
    return tutor
  }
}
