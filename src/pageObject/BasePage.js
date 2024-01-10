export default class BasePage {
  constructor(page, url) {
    this.page = page;
    this.url = url;
  }

  async visit() {
    await this.page.goto(this.url);
  }
}
