import { averageDistance } from "./stringSearch/averageDistance";

class Search {
  queued: string[] = [];
  cache = new Map<string, string[]>();

  onResults: (searchString: string, results: string[]) => void;

  private searchItems: Promise<any[]> = this.fetchItems().catch(err => {
    console.error(err);
    return [];
  });

  constructor(private maxResults: number) {}

  async fetchItems() {
    const res = await fetch("http://localhost:3000/api/search");
    const data = await res.json();
    return data.map((el: any) => ({
      keywords: [
        el.code.toLowerCase().trim(),
        el.title.toLowerCase().trim(),
        `${el.title.toLowerCase().trim()} (${el.code.toLowerCase().trim()})`
      ],
      obj: el
    }));
  }

  private executeSearch(str: string, data: any[]) {
    console.time(`Search '${str}'`);
    const searchStr = str.trim().toLowerCase();

    let result = [];
    var worstScore = 1;
    var worstScoreIndex = -1;

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

    for (let { keywords, obj } of data) {
      let score = 0;
      for (let keyword of keywords) {
        score = Math.max(score, averageDistance(keyword, searchStr));
      }

      let scoreObject = { score: score, obj };
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

    return result;
  }

  private isRunning: boolean = false;
  private searchLoop(data: any[]) {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;

    while (this.queued.length > 0) {
      const next = this.queued.shift();

      const results = this.executeSearch(next, data);
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

    this.searchItems.then(data => this.searchLoop(data));
  }
}

export function run() {
  const search = new Search(10);

  self.addEventListener("message", event => {
    setTimeout(() => {
      search.enqueue(event.data.toString());
    }, 0);
  });

  search.onResults = (str, results) => {
    (self.postMessage as any)({ str, results });
  };
}
