import type { Transation, TransationDTO, TransationType } from "../type";
import { appwrite } from "../lib/appwriter";
import { ID, Models, Query } from "appwrite";

type listByTypeProps = {
  type: TransationType;
};

export class TransationServices {
  async create(newTransations: Transation) {
    try {
      const response = await appwrite.databases.createDocument<TransationDTO>(
        appwrite.TRANSATION_DATABASE_ID,
        appwrite.TRANSATION_COLLECTION_ID,
        ID.unique(),
        newTransations,
      );
      return response;
    } catch (err) {
      console.log(err);
      throw Error(`${err}`);
    }
  }

  async list(userId: string): Promise<Models.DocumentList<TransationDTO>> {
    try {
      const { documents, total } =
        await appwrite.databases.listDocuments<TransationDTO>(
          appwrite.TRANSATION_DATABASE_ID,
          appwrite.TRANSATION_COLLECTION_ID,
          [
            Query.orderDesc("$createdAt"),
            Query.limit(10),
            Query.equal("userId", userId),
          ],
        );
      return { documents, total };
    } catch (err) {
      console.log(err);
      throw Error(`${err}`);
    }
  }

  async delete(id: string) {
    try {
      await appwrite.databases.deleteDocument(
        appwrite.TRANSATION_DATABASE_ID,
        appwrite.TRANSATION_COLLECTION_ID,
        id,
      );
    } catch (err) {
      console.log(err);
      throw Error(`${err}`);
    }
  }

  async listByType({ type }: listByTypeProps) {
    try {
      const { documents } =
        await appwrite.databases.listDocuments<TransationDTO>(
          appwrite.TRANSATION_DATABASE_ID,
          appwrite.TRANSATION_COLLECTION_ID,
          [Query.equal("transationType", type)],
        );
      return documents;
    } catch (err) {
      console.log(err);
      throw Error(`${err}`);
    }
  }
}
