import { averageDistance } from "./stringSearch/averageDistance";

class Search {
  queued: string[] = [];
  cache = new Map<string, string[]>();

  onResults: (searchString: string, results: string[]) => void;

  private searchItems: Promise<any[]> = this.fetchItems().catch((err) => {
    console.error(err);
    return [];
  });

  constructor(private maxResults: number, private url: string) {}

  async fetchItems() {
    const res = await fetch(this.url);
    const data = await res.json();
    return data.map((el: any) => ({
      keywords: [
        el.code.toLowerCase().trim(),
        el.title.toLowerCase().trim(),
        `${el.title.toLowerCase().trim()} (${el.code.toLowerCase().trim()})`,
      ],
      obj: el,
    }));
  }

  private data: any[];

  private executeSearch(str: string) {
    if (this.cache.has(str)) {
      return this.cache.get(str);
    }
    console.time(`Search '${str}'`);
    const searchStr = str.trim().toLowerCase();

    const result = [];
    let worstScore = 1;
    let worstScoreIndex = -1;

    function updateScore() {
      worstScore = 1;
      worstScoreIndex = -1;
      for (let i = 0; i < result.length; i++) {
        if (result[i].score < worstScore) {
          worstScore = result[i].score;
          worstScoreIndex = i;
        }
      }
    }

    for (const { keywords, obj } of this.data) {
      let score = 0;
      for (const keyword of keywords) {
        score = Math.max(score, averageDistance(keyword, searchStr));
      }

      const scoreObject = { score: score, obj };
      if (result.length < this.maxResults) {
        result.push(scoreObject);
        if (score < worstScore) {
          worstScore = score;
          worstScoreIndex = result.length - 1;
        }
      } else {
        if (score > worstScore) {
          result[worstScoreIndex] = scoreObject;
          updateScore();
        }
      }
    }
    result.sort((a, b) => b.score - a.score);
    console.timeEnd(`Search '${str}'`);

    this.cache.set(str, result);
    return result;
  }

  private isRunning = false;
  private searchLoop() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;

    while (this.queued.length > 0) {
      const next = this.queued.shift();

      const results = this.executeSearch(next);
      this.onResults && this.onResults(next, results);
    }

    this.isRunning = false;
  }

  enqueue(str: string) {
    if (this.queued.length === 0) {
      this.queued.push(str);
    } else {
      this.queued[0] = str;
    }

    this.searchItems.then((data) => {
      this.data = data;
      this.searchLoop();
    });
  }
}

export function run() {
  let search: Search;

  self.addEventListener("message", (event) => {
    if (event.data.type === "url") {
      if (search != null) {
        search.onResults = null;
      }
      search = new Search(10, event.data.url);
      search.onResults = (str, results) => {
        (self.postMessage as any)({ str, results });
      };
    }
    if (event.data.type === "search") {
      search.enqueue(event.data.searchString.toString());
    }
  });
}
