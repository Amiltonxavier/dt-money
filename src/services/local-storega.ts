export class LocalStorage {
  private key = "dt-money-account";

  static Storage() {
    const result = localStorage.getItem("dt-money-account");

    if (result) {
      return JSON.parse(result);
    }

    return [];
  }
}
