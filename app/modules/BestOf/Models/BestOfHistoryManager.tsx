class BestOfHistoryManager {
  BestOfHistory: any;

  init(BestOfHistory) {
    this.BestOfHistory = BestOfHistory;
  }

  doesNotContain(bestOf) {
    return !this.BestOfHistory.some(
      existingBestOf => existingBestOf.bestof_id === bestOf.bestof_id,
    );
  }
}

export default new BestOfHistoryManager();
